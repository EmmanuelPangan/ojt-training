import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      alert('⚠ Please fill all fields');
      return;
    }

    const { email, password } = this.loginForm.value;

    const isValid = this.userService.login(email, password);

    if (isValid) {
      alert('✅ Login successful!');
      localStorage.setItem('loggedInUser', email);
    } else {
      alert('❌ Invalid email or password');
    }
  }

  login() {
    console.log('Login button clicked');
    const success = this.authService.login(this.username, this.password);
    console.log('AuthService.isLogin():', this.authService.isLogin());
    if (success) {
      console.log('Routing to exercise');
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
