import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/Course';
import { Teacher } from '../../models/Teacher';
import { EduConnectService } from '../../services/educonnect.service';
import { forkJoin } from 'rxjs';
 
@Component({
    selector: 'app-courseedit',
    templateUrl: './courseedit.component.html',
    styleUrls: ['./courseedit.component.scss']
})
export class CourseEditComponent implements OnInit {
    courseForm!: FormGroup;
    successMessage: string | null = null;
    errorMessage: string | null = null;
    courseId!: number;
    course!: Course;
    teacherId!: number;
    teacher!: Teacher;
 
    constructor(
        private formBuilder: FormBuilder,
        private educonnectService: EduConnectService,
        private route: ActivatedRoute
    ) { }
 
    ngOnInit(): void {
        this.teacherId = Number(localStorage.getItem("teacher_id"));
        this.courseId = Number(this.route.snapshot.paramMap.get('id'));
        this.initializeForm();
        this.loadCourseDetails();
    }
 
    initializeForm(): void {
        this.courseForm = this.formBuilder.group({
            teacher: [{ value: '', disabled: true }],
            courseId: [null],
            courseName: ['', [Validators.required, Validators.minLength(2)]],
            description: ['']
        });
    }
 
    loadCourseDetails(): void {
        forkJoin({
            teacher: this.educonnectService.getTeacherById(this.teacherId),
            course: this.educonnectService.getCourseById(this.courseId)
        }).subscribe({
            next: ({ teacher, course }) => {
                this.teacher = teacher;
                this.course = course;
 
                this.courseForm.patchValue({
                    courseName: this.course.courseName,
                    description: this.course.description,
                    teacher: this.teacher.fullName
                });
            },
            error: (error) => console.error('Error loading course or teacher details:', error)
        });
    }
 
    onSubmit(): void {
        if (this.courseForm.valid) {
            const course: Course = {
                ...this.courseForm.getRawValue(),
                courseId: this.course.courseId,
                teacher: this.teacher,
            };
            this.educonnectService.updateCourse(course).subscribe({
                next: (response) => {
                    this.errorMessage = null;
                    console.log(response);
                    this.courseForm.reset();
                    this.successMessage = 'Course updated successfully!';
                },
                error: (error) => {
                    this.handleError(error);
                }
            });
        } else {
            this.errorMessage = 'Please fill out all required fileds correctly';
            this.successMessage = null;
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