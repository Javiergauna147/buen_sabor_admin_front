import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Insumo } from '../../../services/insumos/insumos.interface';
import { Subject } from 'rxjs';
import { InsumosService } from 'src/app/services/insumos/insumos.service';



@Component({
  selector: 'app-editar-insumo-modal',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule
  ],
  templateUrl: './editar-insumo-modal.component.html',
  styleUrls: ['./editar-insumo-modal.component.scss']
})
export class EditarInsumoModalComponent implements OnInit {

  @Output() insumoEditado = new EventEmitter<string>();

  editarInsumo: Subject<Insumo> = new Subject();

  modalVisible: boolean = false;

  insumo: Insumo | undefined;

  insumoForm = this.fb.group({
    nombre: ['', Validators.required],
    denominacion: ['', Validators.required],
    descripcion: ['', Validators.required],
    marca: ['', Validators.required],
    stock: [0, Validators.required],
    stockMinimo: [0, Validators.required],
    stockMaximo: [0, Validators.required]
  })

  constructor( private insumoService: InsumosService, private fb: FormBuilder ){}

  ngOnInit(): void {
    this.editarInsumo.subscribe((insumo: Insumo) => {
      this.mostrarModal();
      this.cargarInsumo(insumo._id);
    })
  }

  cargarInsumo(id: string){
    this.insumoService.getOneById(id).subscribe((insumo:Insumo) => {
      this.insumo = insumo;
      this.insumoForm.controls['nombre'].setValue(insumo.nombre);
      this.insumoForm.controls['denominacion'].setValue(insumo.denominacion);
      this.insumoForm.controls['descripcion'].setValue(insumo.descripcion);
      this.insumoForm.controls['marca'].setValue(insumo.marca);
      this.insumoForm.controls['stock'].setValue(insumo.stock);
      this.insumoForm.controls['stockMinimo'].setValue(insumo.stockMinimo);
      this.insumoForm.controls['stockMaximo'].setValue(insumo.stockMaximo);
    })
  }

  submitform() {
    let insumoPayload = {
      _id: this.insumo?._id,
      nombre: this.insumoForm.controls['nombre'].value,
      denominacion: this.insumoForm.controls['denominacion'].value,
      descripcion: this.insumoForm.controls['descripcion'].value,
      marca: this.insumoForm.controls['marca'].value,
      stock: this.insumoForm.controls['stock'].value,
      stockMinimo: this.insumoForm.controls['stockMinimo'].value,
      stockMaximo: this.insumoForm.controls['stockMaximo'].value
    }
    this.insumoService.putUpdateOne(insumoPayload).subscribe({
      next: (res) => {
        this.cerrarModal();
      }
    })
  }

  
  mostrarModal(){
    this.modalVisible = true;
  }
  
  cerrarModal(){
    this.insumoForm.reset();
    this.insumoEditado.emit();
    this.modalVisible = false;
  }

  get formularioInvalido(): boolean {
    return this.insumoForm.invalid;
  }
}
