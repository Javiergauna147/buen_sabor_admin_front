import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateProductoPayload, Producto } from './productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private urlProductos: string = environment.API_BASE_ENDPOINT + '/producto-manufacturado';

  constructor( private http: HttpClient ) { }

  getAll(): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlProductos}/find-all`)
  }

  postCreateOne(producto: CreateProductoPayload): Observable<any> {
    return this.http.post<any>(`${this.urlProductos}/create`, producto)
  }

}
