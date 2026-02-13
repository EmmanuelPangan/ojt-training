import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.service.isLogin()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

// Guard to prevent logged-in users from accessing login/register pages
@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private service: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.service.isLogin()) {
      // If already logged in, redirect to home
      this.router.navigate(['/home']);
      return false;
    }

    // Not logged in, allow access to login/register
    return true;
  }
}
