import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { CreateProductoPayload, Producto, UpdateProductoPayload } from 'src/app/services/productos/productos.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TablaInsumosComponent } from '../crea-producto-modal/tabla-insumos/tabla-insumos.component';
import { RubroProducto } from 'src/app/services/rubro-productos/rubro-productos.interface';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { RubroProductosService } from 'src/app/services/rubro-productos/rubro-productos.service';
import { InsumoTabla } from '../crea-producto-modal/tabla-insumos/tabla-insumos.interface';

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
export class EditarProductoModalComponent implements OnInit {

  @ViewChild(TablaInsumosComponent) tablaInsumos: TablaInsumosComponent | undefined;

  @Output() productoEditado = new EventEmitter<void>();

  editarProducto: Subject<Producto> = new Subject();

  rubroSelected: RubroProducto | undefined;

  rubrosProducto: RubroProducto[] = [];

  modalVisible: boolean = false;

  producto: Producto | undefined;

  productoForm = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    detallePreparacion: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(1)]],
    rubro: [null as unknown as {_id: string,nombre: string}, Validators.required],
  })

  constructor(  private fb: FormBuilder, private productosService: ProductosService, private rubroProductosService: RubroProductosService ){}

  ngOnInit(): void {
      this.editarProducto.subscribe({next: (producto: Producto) => {
        this.cargarProducto(producto._id);
        this.cargarRubros();
        this.mostrarModal();
      }})
    }
    
    
    cargarProducto(id: string){
      this.productosService.getOneById(id).subscribe({next: (producto: Producto) => {
        this.producto = producto;
        this.productoForm.controls['nombre'].setValue(producto.nombre);
        this.productoForm.controls['descripcion'].setValue(producto.descripcion);
        this.productoForm.controls['detallePreparacion'].setValue(producto.detallePreparacion);
        this.productoForm.controls['precio'].setValue(producto.precio);
        this.productoForm.controls['rubro'].setValue(producto.rubro);
        this.tablaInsumos?.cargarInsumoEnEdicion(producto.articulos);
    }})
    
  }

  cargarRubros(){
    this.rubroProductosService.getAll().subscribe({
      next: (rubros: RubroProducto[]) => {
        this.rubrosProducto = rubros;
      }
    })
  }

  mostrarModal(){
    this.modalVisible = true;
  }
  
  cerrarModal(){
    this.productoForm.reset();
    this.productoEditado.emit();
    this.tablaInsumos?.restaurarInsumos();
    this.tablaInsumos?.restaurarTabla();
    this.modalVisible = false;
  }

  submitform(){
    let articulosPayload: { cantidad: number, articulo: string }[] = [];

    this.tablaInsumos?.insumosSeleccionados.forEach((articulo: InsumoTabla) => {
      articulosPayload.push({cantidad: articulo.cantidad, articulo: articulo.insumo?._id? articulo.insumo?._id : ''})
    })

    let productoPayload: UpdateProductoPayload = {
      _id: this.producto?._id,
      nombre: this.productoForm.controls['nombre'].value? this.productoForm.controls['nombre'].value : '',
      descripcion: this.productoForm.controls['descripcion'].value? this.productoForm.controls['descripcion'].value : '',
      detallePreparacion: this.productoForm.controls['detallePreparacion'].value? this.productoForm.controls['detallePreparacion'].value : '',
      precio: this.productoForm.controls['precio'].value? this.productoForm.controls['precio'].value : 0,
      rubro: this.rubroSelected?._id? this.rubroSelected?._id : '',
      articulos: articulosPayload
    }
    this.productosService.putUpdateOne(productoPayload).subscribe({next: (res) => {
      this.cerrarModal();
    }})
  }

  get formularioInvalido(): boolean {
    return this.productoForm.invalid;
  }

}
