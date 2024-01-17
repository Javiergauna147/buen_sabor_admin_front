import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-seguro-eliminar-modal',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule
  ],
  templateUrl: './seguro-eliminar-modal.component.html',
  styleUrls: ['./seguro-eliminar-modal.component.scss']
})
export class SeguroEliminarModalComponent {

  @Output() pedidoEliminado = new EventEmitter<void>();

  modalVisible: boolean = false;
  idPedido: string = '';

  constructor(private pedidosService: PedidosService){}
  mostrarModal(id: string){
    this.idPedido = id;
    this.modalVisible = true;
  }

  cerrarModal(){
    this.modalVisible = false;
  }

  eliminarPedido(){
    this.pedidosService.deleteOneById(this.idPedido).subscribe({next: () => {
      this.pedidoEliminado.emit();
      this.cerrarModal();
    }})
  }
}