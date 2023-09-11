import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Insumo } from '../../../services/insumos/insumos.interface';
import { Subject } from 'rxjs';
import { InsumosService } from 'src/app/services/insumos/insumos.service';



@Component({
  selector: 'app-editar-insumo-modal',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule
  ],
  templateUrl: './editar-insumo-modal.component.html',
  styleUrls: ['./editar-insumo-modal.component.scss']
})
export class EditarInsumoModalComponent implements OnInit {

  editarInsumo: Subject<Insumo> = new Subject();

  modalVisible: boolean = false;

  insumo: Insumo | undefined;

  constructor( private insumoService: InsumosService ){}

  ngOnInit(): void {
    this.editarInsumo.subscribe((insumo: Insumo) => {
      this.mostrarModal();
      this.cargarInsumo(insumo._id);
    })
  }

  cargarInsumo(id: string){
    this.insumoService.getOneById(id).subscribe((insumo:Insumo) => {
      console.log('insumo encontrado');
      console.log(insumo)
    })
  }

  mostrarModal(){
    this.modalVisible = true;
  }

  cerrarModal(){
    this.modalVisible = false;
  }
}
