import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (this.registerForm.invalid) {
      this.error = 'Please fill the form correctly';
      return;
    }

    const { email, password, confirmPassword } = this.registerForm.value;
    if (password !== confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    const success = this.authService.register(email, password);
    if (success) {
      this.router.navigate(['/login']);
      return;
    }

    this.error = 'Unable to register. Please try again.';
  }
}
