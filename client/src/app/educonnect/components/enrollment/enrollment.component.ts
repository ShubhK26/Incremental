import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-enrollment',
    templateUrl: './enrollment.component.html',
    styleUrls: ['./enrollment.component.scss']
})

export class EnrollmentComponent {
    enrollmentForm: FormGroup;
    submitted = false;
    successMessage = '';
    errorMessage = '';

    constructor(private fb: FormBuilder) {
        this.enrollmentForm = this.fb.group({
            enrollmentId: [],
            studentId: [ , [Validators.required, Validators.pattern("^[0-9]*$")]],
            courseId: [ , [Validators.required, Validators.pattern("^[0-9]*$")]],
            enrollmentDate: [ , Validators.required]
        });
    }

    onSubmit(): void {
        this.submitted = true;
        this.successMessage = '';
        this.errorMessage = '';

        if (this.enrollmentForm.valid) {
            this.successMessage = 'Enrollment added successfully!';
            this.errorMessage = '';
            console.log(this.enrollmentForm.value);
            this.resetForm();
        } else {
            this.errorMessage = 'Please correct the errors before submitting.';
        }
    }

    resetForm(): void {
        this.submitted = false;
        this.successMessage = '';
        this.errorMessage = '';
        this.enrollmentForm.reset();
    }
}