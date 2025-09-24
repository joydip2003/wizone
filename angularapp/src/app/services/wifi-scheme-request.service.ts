import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WifiSchemeRequest } from '../models/wifi-scheme-request.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WifiSchemeRequestService {

  public apiUrl=`http://localhost:8080/api/wifiSchemeRequest`;


  constructor(private readonly http: HttpClient) {}

  getAllWiFiSchemeRequests(): Observable<WifiSchemeRequest[]> {
    return this.http.get<WifiSchemeRequest[]>(this.apiUrl);
  }

  getWiFiSchemeRequestsByUserId(userId: number): Observable<WifiSchemeRequest[]> {
    return this.http.get<WifiSchemeRequest[]>(`${this.apiUrl}/user/${userId}`);
  }

  addWiFiSchemeRequest(userId:number,wifiSchemeId:number,request: WifiSchemeRequest): Observable<WifiSchemeRequest> {
    console.log(request);
    
    return this.http.post<WifiSchemeRequest>(`${this.apiUrl}/${userId}/${wifiSchemeId}`, request);
  }

  updateWiFiSchemeRequest(id: number, request: WifiSchemeRequest): Observable<WifiSchemeRequest> {
    return this.http.put<WifiSchemeRequest>(`${this.apiUrl}/${id}`, request);
  }

  deleteWiFiSchemeRequest(id: number): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}