import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class ZonaService {

  private url = apiUrl;

  constructor(private http: HttpClient) {}

  obtenerTodasZonas(): Observable<any[]> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>(`${this.url}todas-zonas`, { headers });
  }
}
