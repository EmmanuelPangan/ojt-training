import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly DEMO_EMAIL = 'keiro'
  private readonly DEMO_PASSWORD = 'password123';

  register(email: string, password: string): boolean {
    // In a real application, you would send a request to the backend to register the user.
    // Here, we simply return true for demonstration purposes.
    return true;
  }

  login(email: string, password: string): boolean {
    if (email === this.DEMO_EMAIL && password === this.DEMO_PASSWORD) {
      localStorage.setItem('token', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  constructor() 
  {

  }
}
