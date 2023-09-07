import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Insumo } from '../../../services/insumos/insumos.interface';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-editar-insumo-modal',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule
  ],
  templateUrl: './editar-insumo-modal.component.html',
  styleUrls: ['./editar-insumo-modal.component.scss']
})
export class EditarInsumoModalComponent implements OnInit {

  editarInsumo: Subject<Insumo> = new Subject();

  modalVisible: boolean = false;

  constructor(){}

  ngOnInit(): void {
    this.editarInsumo.subscribe((insumo: Insumo) => {
      this.mostrarModal();
    })
  }

  mostrarModal(){
    this.modalVisible = true;
  }

  cerrarModal(){
    this.modalVisible = false;
  }
}
