import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = '';

  constructor
  (
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) 
  
  { 
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submit()
  {
    if (this.loginForm.invalid) {
      this.error = 'Please fill the form correctly';
      return;
    }

    const { username, password } = this.loginForm.value;
    const success = this.authService.login(username, password);

    if (success) {
      this.router.navigate(['/home']);
    } else {
      this.error = 'Invalid credentials';
    }
  }

  ngOnInit() {
  }

}
