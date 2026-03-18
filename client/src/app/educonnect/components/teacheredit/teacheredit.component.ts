import { HttpErrorResponse } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { Teacher } from '../../models/Teacher';

import { TeacherDTO } from '../../models/TeacherDTO';

import { User } from '../../models/User';

import { EduConnectService } from '../../services/educonnect.service';
 
@Component({

    selector: 'app-teacheredit',

    templateUrl: './teacheredit.component.html',

    styleUrls: ['./teacheredit.component.scss']

})

export class TeacherEditComponent implements OnInit {

    teacherForm!: FormGroup;

    successMessage: string | null = null;

    errorMessage: string | null = null;

    teacherId: number=0;

    userId: number=0;

    teacher: Teacher | undefined;

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

        this.teacherForm = this.formBuilder.group({

            fullName: ['', [Validators.required, Validators.minLength(2)]],

            username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],

            password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]],

            subject: ['', [Validators.required]],

            contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],

            email: [{ value: '', disabled: true }],

            yearsOfExperience: [null, [Validators.required, Validators.min(1)]]

        });

        this.teacherId = Number(this.route.snapshot.paramMap.get('id'));

        this.loadTeacherDetails();

    }
 
    loadTeacherDetails(): void {

        this.educonnectService.getTeacherById(this.teacherId).subscribe({

            next: (response) => {

                this.teacher = response;

                this.teacherForm.patchValue({

                    fullName: this.teacher.fullName,

                    subject: this.teacher.subject,

                    contactNumber: this.teacher.contactNumber,

                    email: this.teacher.email,

                    yearsOfExperience: this.teacher.yearsOfExperience

                });

            },

            error: (error) => console.error('Error loading teacher details:', error)

        });

        this.educonnectService.getUserById(this.userId).subscribe({

            next: (response) => {

                this.user = response;

                this.teacherForm.patchValue({

                    username: this.user.username,

                    password: this.user.password

                });

            },

            error: (error) => console.error('Error loading user details:', error)

        });

    }
 
    onSubmit(): void {

        if (this.teacherForm.valid) {

            const teacher: TeacherDTO = {

                ...this.teacherForm.getRawValue(),

                teacherId: this.teacherId,

            };

            this.educonnectService.updateTeacher(teacher).subscribe({

                next: (response) => {

                    this.errorMessage = null;

                    console.log(response);

                    this.teacherForm.reset();

                },

                error: (error) => {

                    this.handleError(error);

                },

                complete: () => {

                    this.successMessage = 'Teacher updated successfully!';

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
 
 