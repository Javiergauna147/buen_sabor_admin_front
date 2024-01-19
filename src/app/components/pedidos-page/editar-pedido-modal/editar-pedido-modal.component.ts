import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { EstadoPedido, Pedido } from 'src/app/services/pedidos/pedidos.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-editar-pedido-modal',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  templateUrl: './editar-pedido-modal.component.html',
  styleUrls: ['./editar-pedido-modal.component.scss']
})
export class EditarPedidoModalComponent implements OnInit {

  @Output() pedidoEditado = new EventEmitter<void>();

  modalVisible: boolean = false;

  pedido: Pedido | undefined;

  EstadosPedido: EstadoPedido[] = [];
  EstadosPedidoDropdown: EstadoPedido[] = [];

  pedidoForm = this.fb.group({
    estado: [{}, Validators.required],
  })

  constructor(private fb: FormBuilder,  private pedidosService: PedidosService ){}

  ngOnInit(): void {
      this.cargarEstadosPedidos();
  }

  cargarEstadosPedidos(){
    this.pedidosService.getAllEstadosPedido().subscribe({
      next: (estados: EstadoPedido[]) => {
        this.EstadosPedido = estados;
        this.moverEstadoPedidoEnArray(this.pedido?.estado);
      }
    })
  }

  moverEstadoPedidoEnArray(estadoPedido: any){
    let pedidosFiltrados = this.EstadosPedido.filter((estadoEnArray: EstadoPedido) => estadoEnArray.nombre !== estadoPedido.nombre)
    this.EstadosPedidoDropdown = [{...estadoPedido}, ...pedidosFiltrados]
  }

  mostrarModal(){
    this.modalVisible = true;
  }

  cerrarModal(){
    this.modalVisible = false;
  }
}