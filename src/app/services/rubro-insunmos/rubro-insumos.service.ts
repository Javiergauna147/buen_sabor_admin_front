import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RubroInsumo } from './rubro-insumos.interface';

@Injectable({
  providedIn: 'root'
})
export class RubroInsumosService {


  private urlRubroInsumos: string = environment.API_BASE_ENDPOINT + '/rubro-articulo';

  constructor(private http: HttpClient) { }

  getAll(): Observable<RubroInsumo[]>{
    return this.http.get<RubroInsumo[]>(`${this.urlRubroInsumos}/find-all`)
  }
}
