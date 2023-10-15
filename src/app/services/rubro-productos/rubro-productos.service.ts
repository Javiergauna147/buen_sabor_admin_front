import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateRubroProductoPayload, RubroProducto } from './rubro-productos.interface';

@Injectable({
  providedIn: 'root'
})
export class RubroProductosService {

  private urlRubroProductos: string = environment.API_BASE_ENDPOINT + '/rubro-producto-manufacturado';

  constructor(private http: HttpClient) { }

  
  getAll(): Observable<RubroProducto[]>{
    return this.http.get<RubroProducto[]>(`${this.urlRubroProductos}/find-all`)
  }

  postCreateOne(rubro: CreateRubroProductoPayload): Observable<any> {
    return this.http.post<any>(`${this.urlRubroProductos}/create`, rubro);
  }

}
