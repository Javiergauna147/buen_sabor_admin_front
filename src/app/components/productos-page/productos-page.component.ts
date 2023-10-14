import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { ProductosService } from '../../services/productos/productos.service';
import { Producto } from 'src/app/services/productos/productos.interface';
import { ModalVerRecetaComponent } from './modal-ver-receta/modal-ver-receta.component';

@Component({
  selector: 'app-productos-page',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RippleModule,
    DividerModule,
    ModalVerRecetaComponent
  ],
  templateUrl: './productos-page.component.html',
  styleUrls: ['./productos-page.component.scss']
})
export class ProductosPageComponent  implements OnInit {

  @ViewChild(ModalVerRecetaComponent) modalVerReceta: ModalVerRecetaComponent | undefined;

  productos: Producto[] = [];

  constructor( private productosService: ProductosService ) {}
  
  ngOnInit(): void {
      this.productosService.getAll().subscribe({
        next: (productos) => {
          this.productos = productos;
        }
      })
  }

  crearProducto() {

  }

  crearRubroProducto() {

  }

  mostrarRecetaProducto(receta: string) {
    this.modalVerReceta?.mostrarReceta.next(receta);
  }

}
