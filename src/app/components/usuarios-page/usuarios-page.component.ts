import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { Usuario } from 'src/app/services/auth/auth.interface';
import { AuthService } from '../../services/auth/auth.service';
import { CrearUsuarioModalComponent } from './crear-usuario-modal/crear-usuario-modal.component';
import { CrearRolModalComponent } from './crear-rol-modal/crear-rol-modal.component';
import { EditarUsuarioModalComponent } from './editar-usuario-modal/editar-usuario-modal.component';

@Component({
  selector: 'app-usuarios-page',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RippleModule,
    DividerModule,
    CrearUsuarioModalComponent,
    CrearRolModalComponent,
    EditarUsuarioModalComponent
  ],
  templateUrl: './usuarios-page.component.html',
  styleUrls: ['./usuarios-page.component.scss']
})
export class UsuariosPageComponent implements OnInit {

  @ViewChild(CrearUsuarioModalComponent) crearUsuarioModal: CrearUsuarioModalComponent | undefined;
  @ViewChild(CrearRolModalComponent) crearRolModal: CrearRolModalComponent | undefined;
  @ViewChild(EditarUsuarioModalComponent) editarUsuarioModal: EditarUsuarioModalComponent | undefined;

  usuarios: Usuario[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
      this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.authService.findAllusers().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      }
    })
  }

  editarUsuario(id: string) {
   this.editarUsuarioModal?.editarUsuario.next(id);
  }

  crearUsuario() {
    this.crearUsuarioModal?.crearUsuario.next();
  }

  crearRol() {
    this.crearRolModal?.crearRol.next();
  }

}
