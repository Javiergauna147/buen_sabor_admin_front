import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InsumoTabla } from './tabla-insumos.interface';
import { ButtonModule } from 'primeng/button';
import { Insumo } from 'src/app/services/insumos/insumos.interface';
import { InsumosService } from '../../../../services/insumos/insumos.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-tabla-insumos',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    InputTextModule
  ],
  templateUrl: './tabla-insumos.component.html',
  styleUrls: ['./tabla-insumos.component.scss']
})
export class TablaInsumosComponent implements OnInit {

  insumosSeleccionados: InsumoTabla[] = [];

  insumosDisponibles: Insumo[] = [];
  insumosDisponiblesBackUp: Insumo[] = [];

  insumoSelected: Insumo | undefined;


  constructor( private insumosService: InsumosService) {}

  ngOnInit(): void {
    this.insumosService.getAll().subscribe({
      next: ( insumos: Insumo[] ) => {
        this.insumosDisponiblesBackUp = insumos
        this.insumosDisponibles = insumos;
      }
    })
  }

  cargarInsumoEnEdicion(insumos: { cantidad: number,articulo: Insumo }[]){
    insumos.forEach((insumoTabla) => {
      this.agregarInsumo(insumoTabla.articulo, insumoTabla.cantidad)
    })
  }
  
  agregarInsumo(insumo?: Insumo, cantidad?: number) {
    this.insumosSeleccionados.push({
      insumo: insumo? insumo : this.insumoSelected,
      cantidad: cantidad? cantidad : 1
    })
    this.insumosDisponibles = this.insumosDisponibles.filter((insumo: Insumo) => {
      return insumo._id !== this.insumoSelected?._id
    })
  }

  restaurarInsumos(){
    this.insumosDisponibles = [...this.insumosDisponiblesBackUp];
  }


  restaurarTabla(){
    this.insumosSeleccionados = [];
  }

}
