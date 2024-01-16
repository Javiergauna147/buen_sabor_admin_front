import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetAllAdministratorResponse } from './pedidos.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private urlPedidos: string = environment.API_BASE_ENDPOINT + '/pedido';

  constructor( private http: HttpClient ) { }

  getAllAdministrator(): Observable<GetAllAdministratorResponse[]>{
    return this.http.get<GetAllAdministratorResponse[]>(`${this.urlPedidos}/find-all-administrator`)
  }
}
