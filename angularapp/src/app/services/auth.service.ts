import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthService {


  public apiUrl = `http://localhost:8080/api`;



  public userRole = new BehaviorSubject<string>('');
  public userId = new BehaviorSubject<number>(0);

  constructor(private readonly http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(login: Login): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, login);
  }

  setLoginDetails(role: string, id: number) {
    this.userRole.next(role);
    this.userId.next(id);
  }

  getToken(): string {
    const loginDTO = localStorage.getItem('loginDTO');
    return loginDTO ? JSON.parse(loginDTO).token : '';
  }

  getUserRole(): string {
    const loginDTO = localStorage.getItem('loginDTO');
    const parsed = loginDTO ? JSON.parse(loginDTO) : null;
    return parsed && parsed.userRole ? parsed.userRole.toLowerCase() : '';
  }
  
  
  getUserName(): string {
    const loginDTO = localStorage.getItem('loginDTO');
    const parsed = loginDTO ? JSON.parse(loginDTO) : null;
    return parsed && parsed.username ? parsed.username : '';
  }
  
  
  
  isLoggedIn(): boolean {
    const loginDTO = localStorage.getItem('loginDTO');
    return !!(loginDTO && JSON.parse(loginDTO).token);
  }
  
  logout(): void {
    localStorage.removeItem('loginDTO');
    this.userRole.next('');
    this.userId.next(0);
  }  
}