import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Subject } from 'rxjs';
import { Rol, Usuario } from 'src/app/services/auth/auth.interface';
import { AuthService } from '../../../services/auth/auth.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-editar-usuario-modal',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule
  ],
  templateUrl: './editar-usuario-modal.component.html',
  styleUrls: ['./editar-usuario-modal.component.scss']
})
export class EditarUsuarioModalComponent implements OnInit {

  @Output() usuarioEditado = new EventEmitter<void>();

  editarUsuario: Subject<string> = new Subject();

  modalVisible: boolean = false;

  usuario: Usuario | undefined;

  roles: Rol[] = [];

  usuarioForm = this.fb.group({
    email: [{value: '', disabled: true}, Validators.required],
    rol: [{}, Validators.required],
  })

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.editarUsuario.subscribe({
      next: (id: string) => {
        this.cargarUsuario(id);
        this.mostrarModal();
      }
    })
    this.authService.findAllRoles().subscribe({
      next: (roles: Rol[]) => {
        this.roles = roles;
      }
    })
  }

  cargarUsuario(id: string) {
    this.authService.findOneUser(id).subscribe({
      next: (user: Usuario) => {
        this.usuario = user;
        this.usuarioForm.controls['email'].setValue(user.email);
      }
    })
  }

  submitForm() {

  }

  mostrarModal() {
    this.modalVisible = true;
  }

  cerrarModal() {
    this.usuarioForm.reset();
    this.usuarioEditado.emit();
    this.modalVisible = false;
  }

  get formularioInvalido(): boolean {
    return this.usuarioForm.invalid;
  }
}
