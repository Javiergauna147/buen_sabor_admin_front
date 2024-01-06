import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Subject } from 'rxjs';
import { RubroProducto } from 'src/app/services/rubro-productos/rubro-productos.interface';
import { RubroProductosService } from '../../../services/rubro-productos/rubro-productos.service';
import { TablaInsumosComponent } from './tabla-insumos/tabla-insumos.component';
import { ProductosService } from '../../../services/productos/productos.service';
import { CreateProductoPayload } from 'src/app/services/productos/productos.interface';
import { InsumoTabla } from './tabla-insumos/tabla-insumos.interface';

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
    DropdownModule,
    InputTextareaModule,
    TablaInsumosComponent
  ],
  templateUrl: './crea-producto-modal.component.html',
  styleUrls: ['./crea-producto-modal.component.scss']
})
export class CreaProductoModalComponent implements OnInit {

  @ViewChild(TablaInsumosComponent) tablaInsumos: TablaInsumosComponent | undefined;

  @Output() productoCreado = new EventEmitter<void>();

  crearProducto: Subject<void> = new Subject();

  rubroSelected: RubroProducto | undefined;

  rubrosProducto: RubroProducto[] = [];

  modalVisible: boolean = false;

  productoForm = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    detallePreparacion: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(1)]],
    rubro: [{}, Validators.required],
  })

  constructor( private fb: FormBuilder, private rubroProductosService: RubroProductosService, private productosService: ProductosService ) {}

  ngOnInit(): void {
      this.crearProducto.subscribe({
        next: () => {
          this.rubroProductosService.getAll().subscribe({
            next: (rubros: RubroProducto[]) => {
              this.rubrosProducto = rubros;
            }
          })
          this.mostrarModal();
        }
      })
  }

  submitform(){
    let articulosPayload: { cantidad: number, articulo: string }[] = [];

    this.tablaInsumos?.insumosSeleccionados.forEach((articulo: InsumoTabla) => {
      articulosPayload.push({cantidad: articulo.cantidad, articulo: articulo.insumo?._id? articulo.insumo?._id : ''})
    })

    let productoPayload: CreateProductoPayload = {
      nombre: this.productoForm.controls['nombre'].value? this.productoForm.controls['nombre'].value : '',
      descripcion: this.productoForm.controls['descripcion'].value? this.productoForm.controls['descripcion'].value : '',
      detallePreparacion: this.productoForm.controls['detallePreparacion'].value? this.productoForm.controls['detallePreparacion'].value : '',
      precio: this.productoForm.controls['precio'].value? this.productoForm.controls['precio'].value : 0,
      rubro: this.rubroSelected?._id? this.rubroSelected?._id : '',
      articulos: articulosPayload
    }
    this.productosService.postCreateOne(productoPayload).subscribe({
      next: () => {
        this.cerrarModal();
      }
    })
  }

  mostrarModal() {
    this.modalVisible = true;
  }

  cerrarModal(){
    this.productoForm.reset();
    this.productoCreado.emit();
    this.tablaInsumos?.restaurarInsumos();
    this.tablaInsumos?.restaurarTabla();
    this.modalVisible = false;
  }

  
  get formularioInvalido(): boolean {
    return this.productoForm.invalid;
  }

}
