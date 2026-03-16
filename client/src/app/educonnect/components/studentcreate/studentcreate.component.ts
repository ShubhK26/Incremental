import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Student } from '../../models/Student';

@Component({
  selector: 'app-student-create',
  templateUrl: './studentcreate.component.html'
})

export class StudentCreateComponent implements OnInit {
  studentForm!: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  student: Student = new Student(0, '', null, '', '', '')

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.studentForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      dob: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) return;
    this.http.post('/api/students', this.studentForm.value).subscribe({
      next: () => {
        this.successMessage = 'Student created successfully!';
        this.errorMessage = null;
        this.studentForm.reset();
      },
      error: (err: HttpErrorResponse) => this.handleError(err)
    });
  }

  private handleError(error: HttpErrorResponse): void {
    this.errorMessage = error.error?.message || 'Failed to create student.';
    this.successMessage = null;
  }
}