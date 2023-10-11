import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { ProductosService } from '../../services/productos/productos.service';
import { Producto } from 'src/app/services/productos/productos.interface';

@Component({
  selector: 'app-productos-page',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RippleModule,
    DividerModule
  ],
  templateUrl: './productos-page.component.html',
  styleUrls: ['./productos-page.component.scss']
})
export class ProductosPageComponent  implements OnInit {

  productos: Producto[] = [];

  constructor( private productosService: ProductosService ) {}
  
  ngOnInit(): void {
      this.productosService.getAll().subscribe({
        next: (productos) => {
          this.productos = productos;
          console.log(this.productos)
        }
      })
  }

  crearProducto() {

  }

  crearRubroProducto() {

  }

}
