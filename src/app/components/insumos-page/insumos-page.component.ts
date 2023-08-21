import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InsumosService } from 'src/app/services/insumos/insumos.service';
import { Insumo } from 'src/app/services/insumos/insumos.interface';


@Component({
  selector: 'app-insumos-page',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule
  ],
  templateUrl: './insumos-page.component.html',
  styleUrls: ['./insumos-page.component.scss']
})
export class InsumosPageComponent implements OnInit {

  insumos: Insumo[] = [];

  constructor(private insumosService: InsumosService) {}

  ngOnInit(): void {
      this.insumosService.getAll().subscribe({
        next: (insumos: Insumo[]) => {
          this.insumos = insumos
        }
      })
  }

}
