import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private currentUser: string = '';

  constructor() {
    this.loadAuthState();
  }

  // Load authentication state from localStorage on service initialization
  private loadAuthState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');

    if (isLoggedIn === 'true' && currentUser) {
      this.loggedIn = true;
      this.currentUser = currentUser;
    }
  }

  login(username: string, password: string): boolean {
    // Support both username (admin/1234) and email-based login
    if (username === 'admin' && password === '1234') {
      this.loggedIn = true;
      this.currentUser = username;
      this.saveAuthState();
      return true;
    }

    // Check localStorage for registered users with email
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) => (u.email === username || u.username === username) && u.password === password
    );

    if (user) {
      this.loggedIn = true;
      this.currentUser = user.username || user.email;
      this.saveAuthState();
      return true;
    }

    console.log('Login FAILED');
    return false;
  }

  // Save login state to localStorage
  private saveAuthState() {
    localStorage.setItem('isLoggedIn', JSON.stringify(this.loggedIn));
    localStorage.setItem('currentUser', this.currentUser);
  }

  logout() {
    this.loggedIn = false;
    this.currentUser = '';
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  }

  isLogin(): boolean {
    return this.loggedIn;
  }

  getCurrentUser(): string {
    return this.currentUser;
  }
}
