import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  error = '';
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.prefillRegisteredUsername();
  }

  prefillRegisteredUsername() {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // If users exist, get the last registered user's username
    if (existingUsers.length > 0) {
      const lastUser = existingUsers[existingUsers.length - 1];
      this.loginForm.patchValue({
        username: lastUser.username
      });
    }
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.error = 'Please fill all fields correctly';
      return;
    }

    const { username, password } = this.loginForm.value;
    const isValid = this.userService.login(username, password);

    if (isValid) {
      localStorage.setItem('loggedInUser', username);
      this.authService.login(username, password);

      // Clear browser history to prevent back arrow from returning to login
      window.history.replaceState(null, '', '/home');

      this.router.navigate(['/home']);
    } else {
      this.error = 'Invalid username or password';
    }
  }

  login() {
    console.log('Login button clicked');
    const success = this.authService.login(this.username, this.password);
    console.log('AuthService.isLogin():', this.authService.isLogin());
    if (success) {
      console.log('Routing to exercise');

      // Clear browser history to prevent back arrow from returning to login
      window.history.replaceState(null, '', '/home');

      this.router.navigate(['/home']);
    } else {
      console.log('Invalid credentials');
      this.error = 'Invalid username or password';
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
