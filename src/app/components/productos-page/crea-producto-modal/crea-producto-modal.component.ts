import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
    InputTextareaModule
  ],
  templateUrl: './crea-producto-modal.component.html',
  styleUrls: ['./crea-producto-modal.component.scss']
})
export class CreaProductoModalComponent implements OnInit {


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

  constructor( private fb: FormBuilder, private rubroProductosService: RubroProductosService ) {}

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

  }

  mostrarModal() {
    this.modalVisible = true;
  }

  cerrarModal(){
    this.productoForm.reset();
    this.productoCreado.emit();
    this.modalVisible = false;
  }

  
  get formularioInvalido(): boolean {
    return this.productoForm.invalid;
  }

}
