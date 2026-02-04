import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../share-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  error = '';

  constructor
  (
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sharedDataService: ShareDataService
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
      this.sharedDataService.setData('Hello Joseph Keiro');
      this.router.navigate(['/home']);
    } else {
      this.error = 'Invalid credentials';
    }
  }

  register()
  {
    const { username, password } = this.registerForm.value;
    const success = this.authService.register(username, password);
  }

  ngOnInit() : void {
  }


}
