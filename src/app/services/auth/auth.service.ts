import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioResponse } from './auth.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenStorage = localStorage.getItem('token');

  private urlUsuario: string = environment.API_BASE_ENDPOINT + '/auth';

  constructor(private http: HttpClient) { }

  login(user: {email: string, password: string}): Observable<UsuarioResponse>{
    return this.http.post<UsuarioResponse>(`${this.urlUsuario}/login`, user);
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return this.tokenStorage;
  }
}
