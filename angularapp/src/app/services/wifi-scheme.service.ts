import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WifiScheme } from '../models/wifi-scheme.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WifiSchemeService {


  public apiUrl = `http://localhost:8080/api/wifiScheme`;



  constructor(private readonly http: HttpClient) {}

  getAllWiFiSchemes(): Observable<WifiScheme[]> {
    return this.http.get<WifiScheme[]>(this.apiUrl);
  }

  getWiFiSchemeById(id: number): Observable<WifiScheme> {
    return this.http.get<WifiScheme>(`${this.apiUrl}/${id}`);
  }

  addWiFiScheme(scheme: WifiScheme): Observable<WifiScheme> {
    return this.http.post<WifiScheme>(this.apiUrl, scheme);
  }

  updateWiFiScheme(id: number, scheme: WifiScheme): Observable<WifiScheme> {
    return this.http.put<WifiScheme>(`${this.apiUrl}/${id}`, scheme);
  }

  deleteWiFiScheme(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}