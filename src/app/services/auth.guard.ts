// src/app/services/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      console.log("llegó a true")
      return true;  // Permitir acceso si el usuario está autenticado
    } else {
      this.router.navigate(['/login']);  // Redirigir a la página de login si no está autenticado
      console.log("llegó a false")
      return false;
    }
  }
}
