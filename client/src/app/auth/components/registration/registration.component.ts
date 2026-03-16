import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
    registrationForm!: FormGroup;
    successMessage: string | null = null;
    errorMessage: string | null = null;
    selectedRole: string | null = null; // To track the selected role

    constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

    ngOnInit(): void {
        this.registrationForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]],
            role: ['', [Validators.required]],
            fullName: ['', Validators.required],
            contactNumber: ['', Validators.required],
            subject: [''], // Teacher-specific field
            yearsOfExperience: [null], // Teacher-specific field
            dateOfBirth: [null], // Student-specific field
            address: [''], // Student-specific field
        });
    }

    onRoleChange(event: Event): void {
        const selectElement = event.target as HTMLSelectElement;
        const role = selectElement.value;
        this.selectedRole = role;

        // Reset unused fields based on the role
        if (role === 'TEACHER') {
            this.registrationForm.patchValue({ dateOfBirth: null, address: '' });
        } else if (role === 'STUDENT') {
            this.registrationForm.patchValue({ subject: '', yearsOfExperience: null });
        }
    }


    onSubmit(): void {
        if (this.registrationForm.valid) {
            this.authService.createUser(this.registrationForm.value).subscribe({
                next: (response) => {
                    this.successMessage = "User successfully registered";
                    this.errorMessage = null;
                    this.resetForm();
                    console.log('Success:', this.successMessage);
                },
                error: (error) => {
                    if (error.error) {
                        this.errorMessage = error.error;
                    } else {
                        this.errorMessage = 'An unexpected error occurred. Please try again later.';
                    }
                    this.successMessage = null;
                    console.error('Error:', this.errorMessage);
                }
            })
        } else {
            this.errorMessage = 'Please fill out all fields correctly.';
            this.successMessage = null;
        }
    }

    resetForm(): void {
        this.registrationForm.reset();
    }
}