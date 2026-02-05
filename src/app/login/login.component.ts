import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
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

}
