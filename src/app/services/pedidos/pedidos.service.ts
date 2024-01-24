import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetAllAdministratorResponse, GetAllEstadoPedidoResponse } from './pedidos.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private urlPedidos: string = environment.API_BASE_ENDPOINT + '/pedido';
  private urlEstadoPedidos: string = environment.API_BASE_ENDPOINT + '/estado-pedido';

  constructor( private http: HttpClient ) { }

  getAllAdministrator(): Observable<GetAllAdministratorResponse[]>{
    return this.http.get<GetAllAdministratorResponse[]>(`${this.urlPedidos}/find-all-administrator`)
  }

  postCreateEstadoPedido(nombreEstado: string): Observable<any> {
    let payload: object = {
      nombre: nombreEstado
    }
    return this.http.post<any>(`${this.urlEstadoPedidos}/create`, payload)
  }

  getAllEstadosPedido(): Observable<GetAllEstadoPedidoResponse[]> {
    return this.http.get<GetAllEstadoPedidoResponse[]>(`${this.urlEstadoPedidos}/find-all`)
  }

  deleteOneById(idPedido: string): Observable<any>{
    return this.http.delete<any>(`${this.urlPedidos}/delete/${idPedido}`)
  }
}
