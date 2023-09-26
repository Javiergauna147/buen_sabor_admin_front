import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { Usuario } from 'src/app/services/auth/auth.interface';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-usuarios-page',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RippleModule,
    DividerModule
  ],
  templateUrl: './usuarios-page.component.html',
  styleUrls: ['./usuarios-page.component.scss']
})
export class UsuariosPageComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
      this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.authService.findAllusers().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        console.log(this.usuarios)
      }
    })
  }

}
