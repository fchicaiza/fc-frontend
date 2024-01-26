// src/app/services/session-storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  saveAuthData(email: string, token: string): void {
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
  }

  getAuthData(): { email: string | null; token: string | null } {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    return { email: email || null, token: token || null };
  }

  clearAuthData(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  }
}
