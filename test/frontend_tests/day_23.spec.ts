import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Course } from '../app/educonnect/models/Course';
import { EduConnectService } from '../app/educonnect/services/educonnect.service';
import { DashboardComponent } from '../app/educonnect/components/dashboard/dashboard.component';
import { Teacher } from '../app/educonnect/models/Teacher';
import { Student } from '../app/educonnect/models/Student';
import { SharedModule } from '../app/shared/shared.module';
import { CourseCreateComponent } from '../app/educonnect/components/coursecreate/coursecreate.component';

const mockTeacher: Teacher = {
    teacherId: 101, fullName: 'Dr. John', email: 'john@example.com', subject: 'English', yearsOfExperience: 10, contactNumber: '9876543210',
    logAttributes() { }
};
const mockStudent: Student = {
    studentId: 1, fullName: 'Jane', email: 'jane@example.com', dateOfBirth: new Date('2000-12-06'), address: "texas", contactNumber: '9876543210',
    logAttributes() { }
};
const mockCourse: Course = { courseId: 1, courseName: 'English', teacher: mockTeacher, description: "mock desc"};


describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let service: EduConnectService;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            imports: [HttpClientTestingModule, RouterTestingModule, SharedModule, RouterTestingModule],
            providers: [
                { provide: EduConnectService },
                // { provide: Router, useValue: mockRouter },
            ],
        }).compileComponents();
        service = TestBed.inject(EduConnectService);
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should load teacher data if role is TEACHER', () => {
            // Arrange
            spyOn(component, 'loadTeacherData');
            spyOn(service, 'getTeacherById').and.returnValue(of(mockTeacher));
            spyOn(localStorage, 'getItem').and.callFake((key) => {
                const data: { [key: string]: string } = {
                    role: 'TEACHER',
                    user_id: '1',
                    teacher_id: '101',
                };
                return data[key];
            });

            // Act
            component.ngOnInit();

            // Assert
            expect(component.role).toBe('TEACHER');
            expect(component.userId).toBe(1);
            expect(component.teacherId).toBe(101);
            expect(component.loadTeacherData).toHaveBeenCalled();
        });

        it('should not call loadTeacherData if role is not TEACHER', () => {
            // Arrange
            spyOn(component, 'loadTeacherData');
            spyOn(localStorage, 'getItem').and.returnValue(null);

            // Act
            component.ngOnInit();

            // Assert
            expect(component.loadTeacherData).not.toHaveBeenCalled();
        });
    });

    describe('loadTeacherData', () => {

        it('should load teacher details', () => {
            spyOn(service, 'getTeacherById').and.returnValue(of(mockTeacher));
            // Act
            component.loadTeacherData();

            // Assert
            expect(service.getTeacherById).toHaveBeenCalledWith(component.teacherId);
            expect(component.teacherDetails).toEqual(mockTeacher);
        });

        it('should load courses', () => {
            // Act
            spyOn(service, 'getCoursesByTeacherId').and.returnValue(of([mockCourse]));
            component.loadTeacherData();

            // Assert
            expect(service.getCoursesByTeacherId).toHaveBeenCalledWith(component.teacherId);
            expect(component.courses).toEqual([mockCourse]);
        });

        it('should load all students', () => {
            // Act
            spyOn(service, 'getAllStudents').and.returnValue(of([mockStudent]));
            component.loadTeacherData();

            // Assert
            expect(service.getAllStudents).toHaveBeenCalled();
            expect(component.students).toEqual([mockStudent]);
        });
    });

});


describe('CourseCreateComponent', () => {
    let courseCreateFixture: ComponentFixture<CourseCreateComponent>;
    let courseCreateComponent: CourseCreateComponent;
    let mockService: EduConnectService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CourseCreateComponent],
            imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
            providers: [EduConnectService],
        }).compileComponents();

        mockService = TestBed.inject(EduConnectService);

        courseCreateFixture = TestBed.createComponent(CourseCreateComponent);
        courseCreateComponent = courseCreateFixture.componentInstance;

        courseCreateFixture.detectChanges();
    });

    it("should create the component", () => {
        expect(courseCreateComponent).toBeTruthy();
    });

    it('should initialize the form', () => {
        spyOn(mockService, 'getTeacherById').and.returnValue(of(mockTeacher));

        courseCreateComponent.ngOnInit();

        expect(mockService.getTeacherById).toHaveBeenCalledWith(Number(localStorage.getItem('teacher_id')));
    });

    it('should submit the form and call addCourse API', () => {
      
        courseCreateComponent.courseForm.patchValue(mockCourse);
        spyOn(mockService, 'addCourse').and.returnValue(of(mockCourse));
      
        courseCreateComponent.onSubmit();
      
        expect(courseCreateComponent.successMessage).toBe('Course created successfully!');
      });
      

});