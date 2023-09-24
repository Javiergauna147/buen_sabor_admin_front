import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Subject } from 'rxjs';
import { RubroInsumosService } from 'src/app/services/rubro-insunmos/rubro-insumos.service';
import { CreateRubroInsumoPayload } from 'src/app/services/rubro-insunmos/rubro-insumos.interface';

@Component({
  selector: 'app-crear-rubro-insumo-modal',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  templateUrl: './crear-rubro-insumo-modal.component.html',
  styleUrls: ['./crear-rubro-insumo-modal.component.scss']
})
export class CrearRubroInsumoModalComponent implements OnInit {

  crearRubroInsumo: Subject<void> = new Subject();

  modalVisible: boolean = false;

  insumoRubroForm = this.fb.group({
    nombre: ['', Validators.required],
  })

  constructor( private fb: FormBuilder, private rubroInsumosService: RubroInsumosService){}

  ngOnInit(): void {
      this.crearRubroInsumo.subscribe({
        next: () => {
          this.mostrarModal();
        }
      })
  }


  mostrarModal() {
    this.modalVisible = true;
  }

  cerrarModal(){
    this.insumoRubroForm.reset();
    this.modalVisible = false;
  }

  submitForm() {
    let rubroInsumoPayload: CreateRubroInsumoPayload = {
      nombre: this.insumoRubroForm.controls['nombre'].value? this.insumoRubroForm.controls['nombre'].value : ''
    }

    this.rubroInsumosService.postCreateOne(rubroInsumoPayload).subscribe({
      next: () => {
        this.cerrarModal();
      }
    })

  }

  get formularioInvalido(): boolean {
    return this.insumoRubroForm.invalid;
  }

}
