import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Rol } from 'src/app/services/auth/auth.interface';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-crear-usuario-modal',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule
  ],
  templateUrl: './crear-usuario-modal.component.html',
  styleUrls: ['./crear-usuario-modal.component.scss']
})
export class CrearUsuarioModalComponent implements OnInit {

  @Output() usuarioCreado = new EventEmitter<void>();

  crearUsuario: Subject<void> = new Subject();

  rolSelected: Rol | undefined;

  roles: Rol[] = [];

  modalVisible: boolean = false;

  usuarioForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    rol: [{}, Validators.required],
  })

  constructor( private fb: FormBuilder, private authService: AuthService ) {}

  ngOnInit(): void {
      this.crearUsuario.subscribe({
        next: () => {
          this.authService.findAllRoles().subscribe({
            next: (roles: Rol[]) => {
              this.roles = roles;
            }
          })
          this.mostrarModal();
        }
      })
  }

  submitform() {
    let usuarioPayload = {
      email: this.usuarioForm.controls['email'].value? this.usuarioForm.controls['email'].value : '',
      password: this.usuarioForm.controls['password'].value? this.usuarioForm.controls['password'].value : '' ,
      rol: this.rolSelected?.rol
    }
    this.authService.createUser(usuarioPayload).subscribe({
      next: () => {
        this.cerrarModal();
      }
    })
  }

  mostrarModal() {
    this.modalVisible = true;
  }


  cerrarModal(){
    this.usuarioForm.reset();
    this.usuarioCreado.emit();
    this.modalVisible = false;
  }

  get formularioInvalido(): boolean {
    return this.usuarioForm.invalid;
  }

}
