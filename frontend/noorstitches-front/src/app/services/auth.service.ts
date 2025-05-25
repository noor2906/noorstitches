import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Usuario } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = `${environment.apiUrl}/usuarios`;
  http = inject(HttpClient);
  router = inject(Router);

  private userLogueadoSubject = new BehaviorSubject<Usuario | null>(null);
  userLogueado$: Observable<Usuario | null> =
    this.userLogueadoSubject.asObservable();

  //LOGIN
  login(email: string, password: string): Observable<Usuario> {
    const user = {
      id: null,
      nombre: null,
      apellidos: null,
      password: password,
      email: email,
      fotoPerfil: null,
      telefono: null,
    };

    return this.http.post<Usuario>(`${this.apiUrl}/login`, user).pipe(
      tap((user) => {
        this.setUserLogueado(user);
        localStorage.setItem('idUser', user.id?.toString() ?? '');
      })
    );
  }

  //REGISTER
  register(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/registro`, user);
  }

  logout() {
    localStorage.removeItem('idUser');
    this.setUserLogueado(null);
  }

  findUserById(idUser: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${idUser}`);
  }

  // Después de hacer login y obtener el usuario:
  setUserLogueado(user: Usuario | null) {
    this.userLogueadoSubject.next(user);
  }

  // Para obtener el usuario actual sin subscribirse
  getUserLogueado(): Usuario | null {
    return this.userLogueadoSubject.value;
  }

  //Para actualizar los datos del usuario logueado
  guardarCambios(user: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/update`, user);
  }
}
