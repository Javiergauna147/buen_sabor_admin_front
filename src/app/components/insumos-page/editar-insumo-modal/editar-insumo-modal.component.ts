import { Component, OnInit } from '@angular/core';
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
      console.log(insumo)
    })
  }

  submitform() {
    console.log('Suubmiteando Form')
  }

  
  mostrarModal(){
    this.modalVisible = true;
  }
  
  cerrarModal(){
    this.modalVisible = false;
  }

  get formularioInvalido(): boolean {
    return this.insumoForm.invalid;
  }
}
