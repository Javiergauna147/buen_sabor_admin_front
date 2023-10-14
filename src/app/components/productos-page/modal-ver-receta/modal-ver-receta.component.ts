import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-ver-receta',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule
  ],
  templateUrl: './modal-ver-receta.component.html',
  styleUrls: ['./modal-ver-receta.component.scss']
})
export class ModalVerRecetaComponent implements OnInit {

  mostrarReceta: Subject<string> = new Subject();

  receta: string = '';

  modalVisible: boolean = false;

  ngOnInit(): void {
      this.mostrarReceta.subscribe({
        next: (receta) => {
          this.receta = receta;
          this.mostrarModal();
        }
      })
  }

  mostrarModal(){
    this.modalVisible = true;
  }

  cerrarModal(){
    this.modalVisible = false;
  }

}
