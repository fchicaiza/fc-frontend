import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../services/session-storage.service';

@Component({
  selector: 'app-user-info',
  template: `
    <div *ngIf="isLoggedIn">
      <p>Email: {{ userEmail }}</p>
      <p>Token: {{ authToken }}</p>
    </div>
    <div *ngIf="!isLoggedIn">
      <p>No estás autenticado.</p>
    </div>
  `,
})
export class UserInfoComponent implements OnInit {
  isLoggedIn: boolean = false;
  userEmail: string | null = null;
  authToken: string | null = null;

  constructor(private sessionStorageService: SessionStorageService) {}

  ngOnInit() {
    const authData = this.sessionStorageService.getAuthData();
    this.isLoggedIn = !!authData.email && !!authData.token;
    this.userEmail = authData.email;
    this.authToken = authData.token;
  }
}
