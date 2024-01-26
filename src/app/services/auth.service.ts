// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { SessionStorageService } from './session-storage.service'; // Importa el servicio

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUser: User | null = null;
  private url = apiUrl + 'login';
  private isAuthenticated: boolean = false;

  constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) {}

  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem('email') && !!localStorage.getItem('token');
  }

  login(user: User): Promise<boolean> {
    const body = {
      email: user.email,
      password: user.password,
    };

    return new Promise((resolve) => {
      this.http.post<any>(this.url, body).subscribe(
        (response) => {
          // Lógica de respuesta exitosa, ajusta según lo que devuelve tu API
          this.loggedInUser = user;
          this.isAuthenticated = true;

          // Guardar el email y el token en localStorage
          const email = response.identity?.email || '';
          const authToken = response.token;
          localStorage.setItem('email', email);
          localStorage.setItem('token', authToken);

          console.log(user);
          resolve(true);
        },
        (error) => {
          // Lógica de error, ajusta según lo que devuelve tu API
          console.error('Error de autenticación:', error);
          this.isAuthenticated = false;
          resolve(false);
        }
      );
    });
  }

  // Resto del código...
}
