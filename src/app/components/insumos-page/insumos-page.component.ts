import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InsumosService } from 'src/app/services/insumos/insumos.service';
import { Insumo } from 'src/app/services/insumos/insumos.interface';
import { EditarInsumoModalComponent } from './editar-insumo-modal/editar-insumo-modal.component';
import { DividerModule } from 'primeng/divider';
import { CrearInsumoModalComponent } from './crear-insumo-modal/crear-insumo-modal.component';
import { CrearRubroInsumoModalComponent } from './crear-rubro-insumo-modal/crear-rubro-insumo-modal.component';
import { ExcelService } from 'src/app/services/excel';


@Component({
  selector: 'app-insumos-page',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RippleModule,
    EditarInsumoModalComponent,
    DividerModule,
    CrearInsumoModalComponent,
    CrearRubroInsumoModalComponent
  ],
  templateUrl: './insumos-page.component.html',
  styleUrls: ['./insumos-page.component.scss']
})
export class InsumosPageComponent implements OnInit {


  @ViewChild(EditarInsumoModalComponent) editarInsumoModal: EditarInsumoModalComponent | undefined;
  @ViewChild(CrearInsumoModalComponent) crearInsumoModal: CrearInsumoModalComponent | undefined;
  @ViewChild(CrearRubroInsumoModalComponent) crearRubroInsumoModal: CrearRubroInsumoModalComponent | undefined;

  insumos: Insumo[] = [];


  constructor(private insumosService: InsumosService, private excelService: ExcelService) {}

  ngOnInit(): void {
    this.cargarInsumos();
  }
  
  cargarInsumos(){
    this.insumosService.getAll().subscribe({
      next: (insumos: Insumo[]) => {
        this.insumos = insumos
      }
    })
  }


  editarInsumo(insumo: Insumo) {
    this.editarInsumoModal?.editarInsumo.next(insumo);
  }

  crearInsumo(){
    this.crearInsumoModal?.crearInsumo.next();
  }
  crearRubroInsumo(){
    this.crearRubroInsumoModal?.crearRubroInsumo.next();
  }

  generarExcel(){
    const mapeo = [
      {key:"Nombre",fvalor:(item:Insumo)=>item.nombre},
      {key:"Denominacion",fvalor:(item:Insumo)=>item.denominacion},
      {key:"Marca",fvalor:(item:Insumo)=>item.marca},
      {key:"Stock",fvalor:(item:Insumo)=>item.stock},
      {key:"Stock maximo",fvalor:(item:Insumo)=>item.stockMaximo},
      {key:"Stock minimo",fvalor:(item:Insumo)=>item.stockMinimo},
      {key:"Rubro",fvalor:(item:Insumo)=>item.rubro},
    ];
    this.excelService.generarExcel<Insumo>(this.insumos,mapeo,"Insumos");
  }


}
