import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    loginForm!: FormGroup;
    errorMessage: string | null = null;
    successMessage: string | null = null;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]]
        });
    }

    onSubmit(): void {
        console.log('dablas login cha button');
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).pipe(
                tap((response: any) => {
                    console.log("response", response);
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("role", response.roles);
                    
                    localStorage.setItem("user_id", response.userId);
                    localStorage.setItem("teacher_id", response.teacherId);
                    localStorage.setItem("student_id", response.studentId);
                    console.log(localStorage.getItem("role"));
                    console.log("----");
                    console.log(localStorage.getItem("token"));

                    this.router.navigate(["/educonnect"]);
                }),
                catchError((error: string) => {
                    this.errorMessage = 'Invalid username or password';
                    console.error("Login error:", error);
                    return of(null);
                })
            ).subscribe();
        } else {
            this.errorMessage = 'Please fill out the form correctly.';
        }
    }

    goToRegister() {
        this.router.navigate(['../register']);
    }

}