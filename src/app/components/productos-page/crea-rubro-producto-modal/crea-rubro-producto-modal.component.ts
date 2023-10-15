import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Subject } from 'rxjs';
import { RubroProductosService } from '../../../services/rubro-productos/rubro-productos.service';
import { CreateRubroProductoPayload } from 'src/app/services/rubro-productos/rubro-productos.interface';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-crea-rubro-producto-modal',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  templateUrl: './crea-rubro-producto-modal.component.html',
  styleUrls: ['./crea-rubro-producto-modal.component.scss']
})
export class CreaRubroProductoModalComponent implements OnInit {

  crearRubroProducto: Subject<void> = new Subject();

  modalVisible: boolean = false;

  productoRubroForm = this.fb.group({
    nombre: ['', Validators.required],
  })

  constructor( private fb: FormBuilder, private rubroProductosService: RubroProductosService ) {}

  ngOnInit(): void {
      this.crearRubroProducto.subscribe({
        next: () => {
          this.mostrarModal();
        }
      })
  }

  mostrarModal() {
    this.modalVisible = true;
  }

  cerrarModal(){
    this.productoRubroForm.reset();
    this.modalVisible = false;
  }

  submitForm() {
    let rubroProductoPayload: CreateRubroProductoPayload = {
      nombre: this.productoRubroForm.controls['nombre'].value? this.productoRubroForm.controls['nombre'].value : ''
    }

    this.rubroProductosService.postCreateOne(rubroProductoPayload).subscribe({
      next: () => {
        this.cerrarModal();
      }
    })
  }

  get formularioInvalido(): boolean {
    return this.productoRubroForm.invalid;
  }

}
