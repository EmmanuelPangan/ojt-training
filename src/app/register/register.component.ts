import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { combineLatest, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  showBox = false;

  constructor(private fb: FormBuilder, private UserService: UserService) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });


    const password$ = this.registerForm.get('password')!.valueChanges;
    const confirmPassword$ = this.registerForm.get('confirmPassword')!.valueChanges;

    combineLatest([password$, confirmPassword$])
      .pipe(
        map(([password, confirmPassword]) => password === confirmPassword),
        catchError((err) => {
          console.error('Error comparing passwords:', err);
          return of(false);
        })
      )
      .subscribe((isMatch: boolean) => {
        const confirmCtrl = this.registerForm.get('confirmPassword');

        if (!confirmCtrl) return;

        if (!isMatch) {
          confirmCtrl.setErrors({ mismatch: true });
        } else {
          confirmCtrl.setErrors(null);
        }
      });

  }

  onSubmit() {
    if (this.registerForm.valid) {

      // Get existing users or initialize empty array
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

      // Check if email already exists
      const emailExists = existingUsers.some(
        (user: any) => user.email === this.registerForm.value.email
      );

      if (emailExists) {
        alert('⚠ Email already registered!');
        return;
      }

      // Remove confirmPassword before saving
      const { confirmPassword, ...userData } = this.registerForm.value;

      // Save new user
      existingUsers.push(userData);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      alert('🎉 Registration successful!');
      this.registerForm.reset();

    } else {
      alert('⚠ Please complete all fields correctly!');
    }
  }
}