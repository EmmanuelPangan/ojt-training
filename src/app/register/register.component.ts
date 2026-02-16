import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error = '';
  showPassword = false;
  showConfirmPassword = false;
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).+$';
  formData = {
    email: '',
    username: '',
    gender: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  submit(form: NgForm): void {
    if (form.invalid) {
      this.error = 'Please fill the form correctly';
      return;
    }

    const { email, password, confirmPassword } = this.formData;
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

  isRegisterDisabled(form: NgForm): boolean {
    const { email, username, gender, password, confirmPassword } = this.formData;
    const isIncomplete =
      !(email && email.trim()) ||
      !(username && username.trim()) ||
      !(gender && gender.trim()) ||
      !(password && password.trim()) ||
      !(confirmPassword && confirmPassword.trim());

    return form.invalid || isIncomplete || password !== confirmPassword;
  }
}
