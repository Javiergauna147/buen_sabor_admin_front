import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';
import { GetAllAdministratorResponse } from '../../services/pedidos/pedidos.interface';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-pedidos-page',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RippleModule,
    DividerModule
  ],
  templateUrl: './pedidos-page.component.html',
  styleUrls: ['./pedidos-page.component.scss']
})
export class PedidosPageComponent implements OnInit {

  pedidos: GetAllAdministratorResponse[] = [];

  constructor( private pedidosService: PedidosService ){}

  ngOnInit(): void {
    this.buscarPedidos();
  }


  buscarPedidos(){
    this.pedidosService.getAllAdministrator().subscribe({
      next: (pedidos: GetAllAdministratorResponse[]) => {
        this.pedidos = pedidos;
      }
    })
  }

}
