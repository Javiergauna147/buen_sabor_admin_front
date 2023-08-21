import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Insumo } from './insumos.interface';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {


  private urlInsumos: string = environment.API_BASE_ENDPOINT + '/articulo';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Insumo[]>{
    return this.http.get<Insumo[]>(`${this.urlInsumos}/find-all`)
  }
}
