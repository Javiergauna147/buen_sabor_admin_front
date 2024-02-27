import { Component, EventEmitter, Output } from '@angular/core';
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
export class EditarPedidoModalComponent {

  @Output() pedidoEditado = new EventEmitter<Pedido>();

  modalVisible: boolean = false;

  pedido: Pedido | undefined;

  EstadosPedido: EstadoPedido[] = [];
  EstadosPedidoDropdown: EstadoPedido[] = [];

  pedidoForm = this.fb.group({
    estado: [{}, Validators.required],
  })

  constructor(private fb: FormBuilder,  private pedidosService: PedidosService ){}
  cargarEstadosPedidos(){
    this.pedidosService.getAllEstadosPedido().subscribe({
      next: (estados: EstadoPedido[]) => {
        this.EstadosPedido = estados;
        console.log(this.pedido)
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
    this.EstadosPedidoDropdown = [];
    this.pedidoForm.reset();
    this.pedidoEditado.emit(this.pedido);
    this.modalVisible = false;
  }

  editarPedido(pedido: Pedido) {
    this.pedido = pedido;
    this.cargarEstadosPedidos();
    this.mostrarModal();
  }

  submitForm() {
    console.log(this.EstadosPedidoDropdown)
    console.log(this.pedidoForm.value.estado)
    if(this.pedidoForm.value.estado)
      this.pedidosService.updateEstadoPedido(this.pedido!._id, this.pedidoForm.value.estado).subscribe({
        next: (value) => {
          if(this.pedido && this.pedido.estado) 
            this.pedido.estado = value.estado;
          this.cerrarModal();
        }
      })
  }

  get formularioInvalido(): boolean {
    return !(this.pedidoForm.valid && this.pedidoForm.controls.estado.dirty);
  }
}