import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  showBox = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

  
    const password$ = this.registerForm.get('password')!.valueChanges;
    const confirmPassword$ = this.registerForm.get('confirmPassword')!.valueChanges;

    combineLatest([password$, confirmPassword$]).subscribe(
      ([password, confirmPassword]) => {
        const confirmCtrl: FormControl = this.registerForm.get('confirmPassword') as FormControl;

        if (!confirmCtrl) return;

        if (password !== confirmPassword) {
          confirmCtrl.setErrors({ mismatch: true });
        } else {
          confirmCtrl.setErrors(null);
        }
      }
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      alert('🎉 Registration successful!');
      this.registerForm.reset();
    } else {
      alert('⚠ Please complete all fields correctly!');
    }
  }
  
  closeBox() {
    this.showBox = false;}
}