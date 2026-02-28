import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedModule } from '../app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../app/educonnect/models/Course';
import { Student } from '../app/educonnect/models/Student';
import { Teacher } from '../app/educonnect/models/Teacher';
import { DashboardComponent } from '../app/educonnect/components/dashboard/dashboard.component';
import { EduConnectService } from '../app/educonnect/services/educonnect.service';
import { Enrollment } from '../app/educonnect/models/Enrollment';
import { StudentEditComponent } from '../app/educonnect/components/studentedit/studentedit.component';
import { User } from '../app/educonnect/models/User';
import { StudentDTO } from '../app/educonnect/models/StudentDTO';

const mockTeacher: Teacher = {
    teacherId: 101, fullName: 'Dr. John', email: 'john@example.com', subject: 'English', yearsOfExperience: 10, contactNumber: '9876543210',
    logAttributes() { }
};
const mockStudent: Student = {
    studentId: 1, fullName: 'Jane', email: 'jane@example.com', dateOfBirth: new Date('2000-12-06'), address: "texas", contactNumber: '9876543210',
    logAttributes() { }
};
const mockCourses: Course[] = [{ courseId: 1, courseName: 'English', teacher: mockTeacher, description: "mock desc"},
{ courseId: 1, courseName: 'German', teacher: mockTeacher, description: "mock desc"}];

const mockUser: User = {
    userId: 1,
    username: 'janesmith',
    password: 'Password@123',
    role: 'STUDENT',
    student: mockStudent
};

const mockStudentDTO: StudentDTO = {
    studentId: 1,
    fullName: 'Jane',
    dateOfBirth: new Date('2000-12-06'),
    contactNumber: '9876543210',
    username: 'janesmith',
    password: 'Password@123',
    email: 'jane@example.com',
    address: 'texas',
};
const mockEnrollments: Enrollment[] = [{enrollmentId:1, course: mockCourses[0], student: mockStudent, enrollmentDate: new Date('2024-12-06')}];

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let service: EduConnectService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
            providers: [EduConnectService]
        }).compileComponents();

        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(EduConnectService);
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch student details on initialization', () => {
        spyOn(service, 'getStudentById').and.returnValue(of(mockStudent));

        component.studentId = 1;
        component.loadStudentData();

        expect(service.getStudentById).toHaveBeenCalledWith(1);
        expect(component.studentDetails).toEqual(mockStudent);
    });

    it('should fetch courses and enrollments for a student', () => {
        spyOn(service, 'getEnrollmentsByStudent').and.returnValue(of(mockEnrollments));
        spyOn(service, 'getAllCourses').and.returnValue(of(mockCourses));

        component.studentId = 1;
        component.loadStudentData();

        expect(service.getEnrollmentsByStudent).toHaveBeenCalledWith(1);
        expect(component.enrollments).toEqual(mockEnrollments);

        expect(service.getAllCourses).toHaveBeenCalled();
        expect(component.courses).toEqual(mockCourses);
    });

    it('should handle error when fetching student details', () => {
        spyOn(service, 'getStudentById').and.returnValue(throwError({ status: 404 }));

        component.studentId = 1;
        component.loadStudentData();

        expect(service.getStudentById).toHaveBeenCalledWith(1);
        expect(component.studentDetails).toBeUndefined();
    });

});

describe('StudentEditComponent', () => {
    let component: StudentEditComponent;
    let fixture: ComponentFixture<StudentEditComponent>;
    let educonnectService: EduConnectService;

    const mockActivatedRoute = {
        snapshot: {
            paramMap: {
                get: (key: string) => {
                    if (key === 'id') return '1';
                    return null;
                },
            },
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StudentEditComponent],
            imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
            providers: [
                { provide: EduConnectService },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
            ],
        }).compileComponents();

        educonnectService = TestBed.inject(EduConnectService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StudentEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form on ngOnInit', () => {
        const form = component.studentForm;
        expect(form).toBeTruthy();
        expect(form.controls['fullName']).toBeTruthy();
        expect(form.controls['dateOfBirth']).toBeTruthy();
        expect(form.controls['contactNumber']).toBeTruthy();
        expect(form.controls['username']).toBeTruthy();
        expect(form.controls['password']).toBeTruthy();
        expect(form.controls['email']).toBeTruthy();
        expect(form.controls['address']).toBeTruthy();
    });

    it('should load student details on loadStudentDetails', () => {
        spyOn(educonnectService, 'getStudentById').and.returnValue(of(mockStudent));

        component.loadStudentDetails();

        expect(educonnectService.getStudentById).toHaveBeenCalledWith(1);
        expect(component.student).toEqual(mockStudent);
    });

    it('should load user details on loadStudentDetails', () => {
        spyOn(educonnectService, 'getUserById').and.returnValue(of(mockUser));

        component.loadStudentDetails();

        expect(educonnectService.getUserById).toHaveBeenCalledWith(component.userId);
        expect(component.user).toEqual(mockUser);
        expect(component.studentForm.value.username).toEqual('janesmith');
        expect(component.studentForm.value.password).toEqual('Password@123');
    });

    it('should submit valid form and call updateStudent API', () => {
        spyOn(educonnectService, 'updateStudent').and.returnValue(of(mockStudent));

        component.studentForm.patchValue(mockStudentDTO);
        component.onSubmit();

        expect(educonnectService.updateStudent).toHaveBeenCalledWith(mockStudentDTO);
        expect(component.successMessage).toBe('Student updated successfully!');
        expect(component.errorMessage).toBeNull();
    });

});
