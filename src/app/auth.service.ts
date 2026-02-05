import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '1234') {
      this.loggedIn = true;
      return true;
    }
    console.log('Login FAILED');
    return false;
  }
  logout() {
    this.loggedIn = false;
  }

  isLogin(): boolean {
    return this.loggedIn;
  }
}
