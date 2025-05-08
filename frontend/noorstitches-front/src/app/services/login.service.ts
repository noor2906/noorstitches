import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = `${environment.apiUrl}/usuarios`;
  http = inject(HttpClient);
  router = inject(Router);

  login(email: string, password: string): Observable<Usuario> {
    const user = {
      id: null,
      nombre: null,
      apellidos: null,
      password: password,
      email: email,
      fotoPerfil: null,
      telefono: null
    };

    return this.http.post<Usuario>(`${this.apiUrl}/login`, user);
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }
  
}
