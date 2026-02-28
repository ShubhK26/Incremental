import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { SharedModule } from '../app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardComponent } from '../app/educonnect/components/dashboard/dashboard.component';
import { Course } from '../app/educonnect/models/Course';
import { Enrollment } from '../app/educonnect/models/Enrollment';
import { Student } from '../app/educonnect/models/Student';
import { StudentDTO } from '../app/educonnect/models/StudentDTO';
import { Teacher } from '../app/educonnect/models/Teacher';
import { User } from '../app/educonnect/models/User';
import { TeacherEditComponent } from '../app/educonnect/components/teacheredit/teacheredit.component';
import { EduConnectService } from '../app/educonnect/services/educonnect.service';

const mockTeacher: Teacher = {
    teacherId: 1, fullName: 'John', email: 'john@example.com', subject: 'English', yearsOfExperience: 10, contactNumber: '9876543210',
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
    username: 'john',
    password: 'Password@123',
    role: 'TEACHER',
    teacher: mockTeacher
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


describe('TeacherEditComponent', () => {
    let component: TeacherEditComponent;
    let fixture: ComponentFixture<TeacherEditComponent>;
    let service: EduConnectService;
    let route: ActivatedRoute;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TeacherEditComponent],
            imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
            providers: [
                EduConnectService,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { paramMap: { get: () => '1' } },
                    },
                },
            ],
        }).compileComponents();

        service = TestBed.inject(EduConnectService);
        route = TestBed.inject(ActivatedRoute);
        fixture = TestBed.createComponent(TeacherEditComponent);
        component = fixture.componentInstance;

        // Mock localStorage
        spyOn(localStorage, 'getItem').and.callFake((key: string) => {
            if (key === 'user_id') return '1';
            return null;
        });
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form and load teacher details', () => {
        spyOn(service, 'getTeacherById').and.returnValue(of(mockTeacher));
        spyOn(service, 'getUserById').and.returnValue(of(mockUser));

        component.ngOnInit();

        expect(service.getTeacherById).toHaveBeenCalledWith(1);
        expect(service.getUserById).toHaveBeenCalledWith(1);

        expect(component.teacherForm.getRawValue()).toEqual({
            fullName: 'John',
            username: 'john',
            password: 'Password@123',
            subject: 'English',
            contactNumber: '9876543210',
            email: 'john@example.com',
            yearsOfExperience: 10,
        });
    });

    it('should submit valid form and call updateTeacher API', () => {
        spyOn(service, 'updateTeacher').and.returnValue(of(mockTeacher));

        component.ngOnInit();
        component.teacherForm.patchValue({
            fullName: 'John Updated',
            username: 'john',
            password: 'Password@123',
            subject: 'German',
            contactNumber: '9876543211',
            yearsOfExperience: 15,
        });

        component.onSubmit();

        expect(component.successMessage).toBe('Teacher updated successfully!');
        expect(component.errorMessage).toBeNull();
    });

    it('should handle error when loading teacher details fails', () => {
        spyOn(service, 'getTeacherById').and.returnValue(throwError({ status: 404 }));
        spyOn(service, 'getUserById').and.returnValue(throwError({ status: 404 }));

        component.ngOnInit();

        expect(service.getTeacherById).toHaveBeenCalledWith(1);
        expect(service.getUserById).toHaveBeenCalledWith(1);

        expect(component.teacher).toBeUndefined();
        expect(component.user).toBeUndefined();
    });
});

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let service: EduConnectService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
            providers: [EduConnectService],
        }).compileComponents();

        service = TestBed.inject(EduConnectService);
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;

        spyOn(localStorage, 'getItem').and.callFake((key: string) => {
            if (key === 'user_id') return '1';
            if (key === 'role') return 'DOCTOR';
            return null;
        });
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should delete a teacher', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(service, 'deleteTeacher').and.returnValue(of(null));

        component.teacherId = 1;
        component.deleteTeacher();

        expect(service.deleteTeacher).toHaveBeenCalledWith(1);
    });

    it('should delete a course', () => {
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(service, 'deleteCourse').and.returnValue(of(null));

        component.deleteCourse(mockCourses[0].courseId);

        expect(service.deleteCourse).toHaveBeenCalledWith(1);
    });
});
