import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MenuOpcion } from '../home-page.interface';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private urlMenu: string = environment.API_BASE_ENDPOINT + '/auth/home-menu';

  constructor(private http: HttpClient) { }

  getOpcionesMenu(): Observable<MenuOpcion[]>{
    return this.http.get<MenuOpcion[]>(`${this.urlMenu}`);
  }
}
