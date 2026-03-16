import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
 selector: 'app-login',
 templateUrl: './login.component.html',
 styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 loginForm: FormGroup;
 errorMessage: string | null = null;
 successMessage: string | null = null;
 constructor(private formBuilder: FormBuilder) {
   this.loginForm = this.formBuilder.group({
     username: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
     password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]]
   });
 }
 onSubmit(): void {
   if (this.loginForm.valid) {
     this.successMessage = 'Login successful!';
     this.errorMessage = null;
     console.log(this.loginForm.value);
   } else {
     this.errorMessage = 'Please fill out all fields correctly.';
     this.successMessage = null;
   }
 }
}