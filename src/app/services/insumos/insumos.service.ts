import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Insumo, createInsumoPayload } from './insumos.interface';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {


  private urlInsumos: string = environment.API_BASE_ENDPOINT + '/articulo';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Insumo[]>{
    return this.http.get<Insumo[]>(`${this.urlInsumos}/find-all`)
  }

  getOneById(id: string): Observable<Insumo>{
    return this.http.get<Insumo>(`${this.urlInsumos}/find/${id}`)
  }

  putUpdateOne(insumo: any): Observable<any>{
    return this.http.put<Insumo>(`${this.urlInsumos}/update`, insumo)
  }

  postCreateOne(insumo: createInsumoPayload): Observable<any>{
    return this.http.post<any>(`${this.urlInsumos}/create`, insumo)
  }
}
