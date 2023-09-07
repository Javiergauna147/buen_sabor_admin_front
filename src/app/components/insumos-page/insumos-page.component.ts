import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InsumosService } from 'src/app/services/insumos/insumos.service';
import { Insumo } from 'src/app/services/insumos/insumos.interface';
import { EditarInsumoModalComponent } from './editar-insumo-modal/editar-insumo-modal.component';


@Component({
  selector: 'app-insumos-page',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RippleModule,
    EditarInsumoModalComponent
  ],
  templateUrl: './insumos-page.component.html',
  styleUrls: ['./insumos-page.component.scss']
})
export class InsumosPageComponent implements OnInit {


  @ViewChild(EditarInsumoModalComponent) editarInsumoModal: EditarInsumoModalComponent | undefined;

  insumos: Insumo[] = [];

  constructor(private insumosService: InsumosService) {}

  ngOnInit(): void {
      this.insumosService.getAll().subscribe({
        next: (insumos: Insumo[]) => {
          this.insumos = insumos
        }
      })
  }


  editarInsumo(insumo: Insumo) {
    this.editarInsumoModal?.editarInsumo.next(insumo);
  }

}
