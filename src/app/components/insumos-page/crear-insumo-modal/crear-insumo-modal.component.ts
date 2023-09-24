import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { Subject } from 'rxjs';
import { InsumosService } from 'src/app/services/insumos/insumos.service';
import { RubroInsumosService } from '../../../services/rubro-insunmos/rubro-insumos.service';
import { RubroInsumo } from 'src/app/services/rubro-insunmos/rubro-insumos.interface';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-crear-insumo-modal',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    CheckboxModule
  ],
  templateUrl: './crear-insumo-modal.component.html',
  styleUrls: ['./crear-insumo-modal.component.scss']
})
export class CrearInsumoModalComponent implements OnInit {


  @Output() insumoCreado = new EventEmitter<void>();

  crearInsumo: Subject<void> = new Subject();

  rubroSelected: RubroInsumo | undefined;

  modalVisible: boolean = false;

  rubrosInsumos: RubroInsumo[] = [];

  insumoForm = this.fb.group({
    nombre: ['', Validators.required],
    denominacion: ['', Validators.required],
    descripcion: ['', Validators.required],
    marca: ['', Validators.required],
    stock: [0, [Validators.required, Validators.min(0)]],
    stockMinimo: [0, [Validators.required, Validators.min(1)]],
    stockMaximo: [0, [Validators.required, Validators.min(1)]],
    rubro: [{}, Validators.required],
    requiereRefrigeracion: [false, Validators.required]
  })


  constructor( private fb: FormBuilder, private insumoService: InsumosService, private rubroInsumosService: RubroInsumosService){

  }

  ngOnInit(): void {
    this.crearInsumo.subscribe({
      next: () => {
        this.rubroInsumosService.getAll().subscribe({
          next: (rubros: RubroInsumo[]) => {
            this.rubrosInsumos = rubros;
          }
        })
        this.mostrarModal();
      }
    })
  }

  
  submitform() {
    let insumoPayload = {
      nombre: this.insumoForm.controls['nombre'].value? this.insumoForm.controls['nombre'].value : '',
      denominacion: this.insumoForm.controls['denominacion'].value? this.insumoForm.controls['denominacion'].value : '' ,
      descripcion: this.insumoForm.controls['descripcion'].value? this.insumoForm.controls['descripcion'].value : '',
      marca: this.insumoForm.controls['marca'].value? this.insumoForm.controls['marca'].value : '',
      stock: this.insumoForm.controls['stock'].value? this.insumoForm.controls['stock'].value : 0,
      stockMinimo: this.insumoForm.controls['stockMinimo'].value? this.insumoForm.controls['stockMinimo'].value : 0,
      stockMaximo: this.insumoForm.controls['stockMaximo'].value? this.insumoForm.controls['stockMaximo'].value : 0,
      requiereRefrigeracion: this.insumoForm.controls['requiereRefrigeracion'].value? this.insumoForm.controls['requiereRefrigeracion'].value : false,
      rubro: this.rubroSelected?._id
    }
    this.insumoService.postCreateOne(insumoPayload).subscribe({
      next: () => {
        this.cerrarModal();
      }
    })
  }



  mostrarModal() {
    this.modalVisible = true;
  }
  
  cerrarModal(){
    this.insumoForm.reset();
    this.insumoCreado.emit();
    this.modalVisible = false;
  }

  get formularioInvalido(): boolean {
    return this.insumoForm.invalid;
  }
}
