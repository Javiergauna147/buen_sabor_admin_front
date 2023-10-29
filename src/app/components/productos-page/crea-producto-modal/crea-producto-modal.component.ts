import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-crea-producto-modal',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule
  ],
  templateUrl: './crea-producto-modal.component.html',
  styleUrls: ['./crea-producto-modal.component.scss']
})
export class CreaProductoModalComponent implements OnInit {


  @Output() productoCreado = new EventEmitter<void>();

  crearProducto: Subject<void> = new Subject();

  modalVisible: boolean = false;

  constructor( private fb: FormBuilder ) {}

  ngOnInit(): void {
      this.crearProducto.subscribe({
        next: () => {
          this.mostrarModal();
        }
      })
  }

  submitform(){

  }

  mostrarModal() {
    this.modalVisible = true;
  }

  cerrarModal(){
    this.productoCreado.emit();
    this.modalVisible = false;
  }

}
