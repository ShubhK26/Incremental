import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-teacher-create',
    templateUrl: './teachercreate.component.html',
    styleUrls: ['./teachercreate.component.scss']
})
export class TeacherCreateComponent {
    teacherForm: FormGroup;
    submitted = false;
    successMessage = '';
    errorMessage = '';

    constructor(private fb: FormBuilder) {
        this.teacherForm = this.fb.group({
            teacherId: [0],
            fullName: ['', Validators.required],
            contactNumber: ['',[Validators.required, Validators.pattern(/^\d{10}$/)]],
            email: ['', [Validators.required, Validators.email]],
            subject: ['', Validators.required],
            yearsOfExperience: [0, [Validators.required, Validators.min(1)]]
        });
    }

    get f() {
        return this.teacherForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;
        this.successMessage = '';
        this.errorMessage = '';
        if (this.teacherForm.invalid) {
            this.errorMessage = 'Please correct the errors in the form.';
            return;
        }
        const teacher = this.teacherForm.value;
        console.log('Teacher Created:', teacher);
        this.successMessage = 'Teacher created successfully!';
        this.teacherForm.reset();
        this.submitted = false;
    }
    
    resetForm(): void {
        this.teacherForm.reset();
        this.submitted = false;
        this.successMessage = '';
        this.errorMessage = '';
    }
}