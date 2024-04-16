import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { GetAllAdministratorResponse, Pedido } from '../../services/pedidos/pedidos.interface';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { SeguroEliminarModalComponent } from './seguro-eliminar-modal/seguro-eliminar-modal.component';
import { EditarPedidoModalComponent } from './editar-pedido-modal/editar-pedido-modal.component';
import { SocketPedidoService } from 'src/app/services/socket/socket-pedido.service';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ExcelService } from 'src/app/services/excel';

@Component({
  selector: 'app-pedidos-page',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RippleModule,
    DividerModule,
    SeguroEliminarModalComponent,
    EditarPedidoModalComponent
  ],
  templateUrl: './pedidos-page.component.html',
  styleUrls: ['./pedidos-page.component.scss']
})
export class PedidosPageComponent implements OnInit {


  @ViewChild(SeguroEliminarModalComponent) seguroEliminarModal: SeguroEliminarModalComponent | undefined;
  @ViewChild(EditarPedidoModalComponent) editarPedidoModal: EditarPedidoModalComponent | undefined;

  pedidos: GetAllAdministratorResponse[] = [];

  constructor( private pedidosService: PedidosService, public socketPedidosService: SocketPedidoService, private excelService: ExcelService){}

  ngOnInit(): void {
    this.buscarPedidos();
    this.seguroEliminarModal?.pedidoEliminado.subscribe({next: () => {
      this.buscarPedidos();
    }})
  }


  eliminarPedido(idPedido: string){
    this.seguroEliminarModal?.mostrarModal(idPedido);
  }

  editarPedido(pedido: Pedido){
    this.editarPedidoModal?.editarPedido(pedido);
  }

  handlerPedidoEditado(pedido: Pedido){
    this.socketPedidosService.sendEventUpdatePedido(pedido._id,pedido.estado.nombre??"", pedido.cliente._id);
    this.buscarPedidos();
  }

  buscarPedidos(){
    this.pedidosService.getAllAdministrator().subscribe({
      next: (pedidos: GetAllAdministratorResponse[]) => {
        this.pedidos = pedidos;
      }
    })
  }
  generarExcel(){
    const mapeo = [
      {key:"Cliente",fvalor:(item:GetAllAdministratorResponse)=>item.cliente.email},
      {key:"Fecha creacion",fvalor:(item:GetAllAdministratorResponse)=>(item.fecha)},
      {key:"Estado",fvalor:(item:GetAllAdministratorResponse)=>item.estado.nombre},
      {key:"Precio",fvalor:(item:GetAllAdministratorResponse)=>item.precio}];
      this.excelService.generarExcel<GetAllAdministratorResponse>(this.pedidos,mapeo,"Pedidos")
  }
}
