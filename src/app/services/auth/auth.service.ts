import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol, Usuario, UsuarioResponse } from './auth.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenStorage = localStorage.getItem('token');

  private urlUsuario: string = environment.API_BASE_ENDPOINT + '/auth';

  constructor(private http: HttpClient) { }

  login(user: Usuario): Observable<UsuarioResponse>{
    return this.http.post<UsuarioResponse>(`${this.urlUsuario}/login`, user);
  }

  createUser(user: Usuario): Observable<any>{
    return this.http.post<any>(`${this.urlUsuario}/create-user`, user);
  }

  createRol(rol: Rol): Observable<any>{
    return this.http.post<any>(`${this.urlUsuario}/rol`, rol);
  }

  findAllusers(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.urlUsuario}/users`);
  }
  findOneUser(id: string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlUsuario}/user/${id}`);
  }

  findAllRoles(): Observable<Rol[]>{
    return this.http.get<Rol[]>(`${this.urlUsuario}/roles`);
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return this.tokenStorage;
  }
}
