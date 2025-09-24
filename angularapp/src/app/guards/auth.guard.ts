import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Adjust path if needed

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // ✅ Check if user is logged in
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // ✅ Check if route requires a specific role
    const expectedRole = route.data['role'];
    const loginDTO = localStorage.getItem('loginDTO');
    const userRole = loginDTO ? JSON.parse(loginDTO).userRole : null;

    // ✅ If role is required and doesn't match, redirect to error page
    if (expectedRole && userRole !== expectedRole) {
      this.router.navigate(['/error']);
      return false;
    }

    // ✅ Allow access
    return true;
  }
}
