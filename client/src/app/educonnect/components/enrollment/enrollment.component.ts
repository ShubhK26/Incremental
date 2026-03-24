import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../models/Course';
import { Enrollment } from '../../models/Enrollment';
import { Student } from '../../models/Student';
import { EduConnectService } from '../../services/educonnect.service';

@Component({
    selector: 'app-enrollment',
    templateUrl: './enrollment.component.html',
    styleUrls: ['./enrollment.component.scss']
})
export class EnrollmentComponent implements OnInit {
    enrollmentForm!: FormGroup;
    successMessage: string | null = null;
    errorMessage: string | null = null;

    courses: Course[] = [];
    students: Student[] = [];
    role!: string | null;
    studentId!: number;
    student!: Student;

    constructor(private formBuilder: FormBuilder, private educonnectService: EduConnectService) { }

    ngOnInit(): void {
        this.role = localStorage.getItem("role");
        this.studentId = Number(localStorage.getItem("student_id"));

        this.initializeForm();

        if (this.role === 'TEACHER') {
            this.loadTeacherData();
        } else if (this.role === 'STUDENT') {
            this.loadStudentData();
        }

        this.loadCourses();
    }

    initializeForm(): void {
        this.enrollmentForm = this.formBuilder.group({
            enrollmentId: [null],
            student: ['', Validators.required],
            course: ['', Validators.required],
            enrollmentDate: [null, Validators.required],
        });
    }

    loadTeacherData(): void {
        this.educonnectService.getAllStudents().subscribe({
            next: (response) => {
                this.students = response;
            },
            error: (error) => console.log('Error loading students.', error)
        });
    }

    loadStudentData(): void {
        this.educonnectService.getStudentById(this.studentId).subscribe({
            next: (response) => {
                this.student = response;
                console.log(response);
                this.enrollmentForm.patchValue({ student: this.student.fullName });
            },
            error: (error) => console.log('Error loading student details.', error)
        });
    }

    loadCourses(): void {
        this.educonnectService.getAllCourses().subscribe({
            next: (response) => {
                this.courses = response;
            },
            error: (error) => console.log('Error loading courses.', error)
        });
    }

    onSubmit(): void {
        if (this.enrollmentForm.valid) {
            const enrollmentData: Enrollment = {
                ...this.enrollmentForm.getRawValue(),
                student: this.role === 'STUDENT' ? this.student : this.enrollmentForm.getRawValue().student
            }
            this.educonnectService.createEnrollment(enrollmentData).subscribe({
                next: () => {
                    this.successMessage = 'Enrollment created successfully!';
                    this.errorMessage = null;
                    this.enrollmentForm.reset();
                    if (this.role === 'STUDENT') {
                        this.enrollmentForm.patchValue({ student: this.student });
                        this.enrollmentForm.get('student')?.disable();
                    }
                },
                error: (error) => this.handleError(error)
            });
        }
    }

    private handleError(error: HttpErrorResponse): void {
        if (error.error instanceof ErrorEvent) {
            this.errorMessage = ` ${error.error.message}`;
        } else {
            this.errorMessage = `${error.error}`;
        }
        this.successMessage = null;
    }
} 