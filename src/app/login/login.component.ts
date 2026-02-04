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
    const success = this.authService.login(this.username, this.password);
    if (success) {
      this.router.navigate(['/home']);
    } else {
      this.error = 'Invalid username or password';
    }
  }

}
