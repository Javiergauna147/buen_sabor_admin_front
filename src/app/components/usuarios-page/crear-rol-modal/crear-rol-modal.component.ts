import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-crear-rol-modal',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  templateUrl: './crear-rol-modal.component.html',
  styleUrls: ['./crear-rol-modal.component.scss']
})
export class CrearRolModalComponent  implements OnInit {

  @Output() rolCreado = new EventEmitter<void>();

  crearRol: Subject<void> = new Subject();

  modalVisible: boolean = false;

  rolForm = this.fb.group({
    nombre: ['', Validators.required],
  })

  constructor( private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
      this.crearRol.subscribe({
        next: () => {
          this.mostrarModal();
        }
      })
  }


  submitform() {
    let rolPayload = {
      rol: this.rolForm.controls['nombre'].value? this.rolForm.controls['nombre'].value : '',
    }
    this.authService.createRol(rolPayload).subscribe({
      next: () => {
        this.cerrarModal();
      }
    })
  }

  mostrarModal() {
    this.modalVisible = true;
  }


  cerrarModal(){
    this.rolForm.reset();
    this.rolCreado.emit();
    this.modalVisible = false;
  }

  get formularioInvalido(): boolean {
    return this.rolForm.invalid;
  }

}
