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
    CrearRolModalComponent
  ],
  templateUrl: './usuarios-page.component.html',
  styleUrls: ['./usuarios-page.component.scss']
})
export class UsuariosPageComponent implements OnInit {

  @ViewChild(CrearUsuarioModalComponent) crearUsuarioModal: CrearUsuarioModalComponent | undefined;
  @ViewChild(CrearRolModalComponent) CrearRolModal: CrearRolModalComponent | undefined;

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

  crearUsuario() {
    this.crearUsuarioModal?.crearUsuario.next();
  }

  crearRol() {
    this.CrearRolModal?.crearRol.next();
  }

}
