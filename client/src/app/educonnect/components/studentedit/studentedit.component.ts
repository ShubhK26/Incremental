import { HttpErrorResponse } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { Student } from '../../models/Student';

import { StudentDTO } from '../../models/StudentDTO';

import { User } from '../../models/User';

import { EduConnectService } from '../../services/educonnect.service';
 
@Component({

    selector: 'app-studentedit',

    templateUrl: './studentedit.component.html',

    styleUrls: ['./studentedit.component.scss']

})

export class StudentEditComponent implements OnInit {

    studentForm!: FormGroup;

    successMessage: string | null = null;

    errorMessage: string | null = null;

    studentId: number=0;

    userId: number=0;

    student: Student | undefined;

    user: User | undefined;
 
    constructor(

        private formBuilder: FormBuilder,

        private educonnectService: EduConnectService,

        private route: ActivatedRoute

    ) { }
 
    ngOnInit(): void {

        this.initializeForm();

    }
 
    initializeForm(): void {

        this.userId = Number(localStorage.getItem("user_id"));

        this.studentForm = this.formBuilder.group({

            fullName: ['', [Validators.required, Validators.minLength(2)]],

            dateOfBirth: ['', [Validators.required]],

            contactNumber: [

                '',

                [Validators.required, Validators.pattern('^[0-9]{10}$')]

            ],

            username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],

            password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]],

            email: [{ value: '', disabled: true }],

            address: ['', [Validators.required, Validators.minLength(5)]]

        });

        this.studentId = Number(this.route.snapshot.paramMap.get('id'));

        this.loadStudentDetails();

    }
 
 
    loadStudentDetails(): void {

        this.educonnectService.getStudentById(this.studentId).subscribe({

            next: (response) => {

                this.student = response;

                const formattedDateOfBirth = this.student.dateOfBirth

                    ? new Date(this.student.dateOfBirth).toISOString().split('T')[0]

                    : '';

                this.studentForm.patchValue({

                    fullName: this.student.fullName,

                    dateOfBirth: formattedDateOfBirth,

                    contactNumber: this.student.contactNumber,

                    email: this.student.email,

                    address: this.student.address

                });

            },

            error: (error) => console.error('Error loading student details:', error)

        });

        this.educonnectService.getUserById(this.userId).subscribe({

            next: (response) => {

                this.user = response;

                this.studentForm.patchValue({

                    username: this.user.username,

                    password: this.user.password

                });

            },

            error: (error) => console.error('Error loading user details:', error)

        });

    }
 
    onSubmit(): void {

        if (this.studentForm.valid) {

            const student: StudentDTO = {

                ...this.studentForm.getRawValue(),

                studentId: this.studentId,

            };

            this.educonnectService.updateStudent(student).subscribe({

                next: (response) => {

                    this.errorMessage = null;

                    console.log(response);

                    this.studentForm.reset();

                    this.successMessage = 'Student updated successfully!';

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
 