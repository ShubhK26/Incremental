import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    registrationForm!: FormGroup;
    successMessage: string | null = null;
    errorMessage: string | null = null;
    selectedRole: string | null = null;
    constructor(private formBuilder: FormBuilder) { }
    ngOnInit(): void {
        this.registrationForm = this.formBuilder.group({
            role: ['', Validators.required],
            username: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]],
            fullName: ['', Validators.required],
            contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
            subject: [''],
            yearsOfExperience: [null],
            dateOfBirth: [null],
            address: ['']
        });
    }
    onRoleChange(event: Event): void {
        const role = (event.target as HTMLSelectElement).value;
        this.selectedRole = role;
        if (role === 'STUDENT') {
            this.registrationForm.get('studentClass')?.setValidators([Validators.required]);
            this.registrationForm.get('teacherSubject')?.clearValidators();
        } else if (role === 'TEACHER') {
            this.registrationForm.get('teacherSubject')?.setValidators([Validators.required]);
            this.registrationForm.get('studentClass')?.clearValidators();
        }
        this.registrationForm.get('studentClass')?.updateValueAndValidity();
        this.registrationForm.get('teacherSubject')?.updateValueAndValidity();
    }
    onSubmit(): void {
        if (this.registrationForm.valid) {
            this.successMessage = 'Registration successful!';
            this.errorMessage = null;
            console.log(this.registrationForm.value);
            this.resetForm();
        } else {
            this.errorMessage = 'Please fill out all fields correctly.';
            this.successMessage = null;
        }
    }
    resetForm(): void {
        this.registrationForm.reset();
        this.selectedRole = null;
    }
};