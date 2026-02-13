import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storageKey = 'users';

  constructor() { }
  getUsers() {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveUser(user: any) {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  emailExists(email: string): boolean {
    const users = this.getUsers();
    return users.some((u: any) => u.email === email);
  }
  login(email: string, password: string): boolean {
    const users = this.getUsers();

    return users.some(
      (user: any) =>
        user.email === email && user.password === password
    );
  }
}
