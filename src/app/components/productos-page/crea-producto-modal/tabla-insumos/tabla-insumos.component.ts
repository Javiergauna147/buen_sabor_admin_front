import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InsumoTabla } from './tabla-insumos.interface';
import { ButtonModule } from 'primeng/button';
import { Insumo } from 'src/app/services/insumos/insumos.interface';
import { InsumosService } from '../../../../services/insumos/insumos.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tabla-insumos',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    FormsModule
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
  
  agregarInsumo() {
    this.insumosSeleccionados.push({
      insumo: this.insumoSelected,
      cantidad: 1
    })
  }

  restaurarInsumos(){
    this.insumosDisponibles = [...this.insumosDisponiblesBackUp];
  }


  restaurarTabla(){
    this.insumosSeleccionados = [];
  }

}
