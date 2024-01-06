import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { Producto } from 'src/app/services/productos/productos.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TablaInsumosComponent } from '../crea-producto-modal/tabla-insumos/tabla-insumos.component';
import { RubroProducto } from 'src/app/services/rubro-productos/rubro-productos.interface';

@Component({
  selector: 'app-editar-producto-modal',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    InputTextareaModule,
    TablaInsumosComponent
  ],
  templateUrl: './editar-producto-modal.component.html',
  styleUrls: ['./editar-producto-modal.component.scss']
})
export class EditarProductoModalComponent {

  @ViewChild(TablaInsumosComponent) tablaInsumos: TablaInsumosComponent | undefined;

  @Output() productoEditado = new EventEmitter<void>();

  editarProducto: Subject<Producto> = new Subject();

  rubroSelected: RubroProducto | undefined;

  modalVisible: boolean = false;

  producto: Producto | undefined;

  productoForm = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    detallePreparacion: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(1)]],
    rubro: [{}, Validators.required],
  })

  constructor(  private fb: FormBuilder ){}

}
