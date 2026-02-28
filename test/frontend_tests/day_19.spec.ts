import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CourseCreateComponent } from '../app/educonnect/components/coursecreate/coursecreate.component';
import { TeacherCreateComponent } from '../app/educonnect/components/teachercreate/teachercreate.component';


describe('TeacherCreateComponent', () => {
    let teacherFixture: ComponentFixture<TeacherCreateComponent>;
    let teacherComponent: TeacherCreateComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TeacherCreateComponent],
            imports: [ReactiveFormsModule],
            providers: [FormBuilder]
        }).compileComponents();

        teacherFixture = TestBed.createComponent(TeacherCreateComponent);
        teacherComponent = teacherFixture.componentInstance;
        teacherFixture.detectChanges();
    });

    it('should create the component', () => {
        expect(teacherComponent).toBeTruthy();
    });

    it('should initialize the form with default values', () => {
        const form = teacherComponent.teacherForm.value;
        expect(form).toEqual({
            teacherId: 0,
            fullName: '',
            contactNumber: '',
            email: '',
            subject: '',
            yearsOfExperience: 0,
        });
    });

    it('should validate teacher form inputs', () => {
        const form = teacherComponent.teacherForm;

        const fullNameControl = form.controls['fullName'];
        fullNameControl.setValue('');
        expect(fullNameControl.valid).toBeFalsy();

        const contactNumberControl = form.controls['contactNumber'];
        contactNumberControl.setValue('12345'); // Invalid contact number
        expect(contactNumberControl.valid).toBeFalsy();

        contactNumberControl.setValue('1234567890'); // Valid contact number
        expect(contactNumberControl.valid).toBeTruthy();
    });

    it('should mark form as valid when all fields are filled correctly', () => {
        teacherComponent.teacherForm.patchValue({
            teacherId: 1,
            fullName: 'John Doe',
            contactNumber: '1234567890',
            email: 'john.doe@example.com',
            subject: 'Mathematics',
            yearsOfExperience: 5,
        });
        expect(teacherComponent.teacherForm.valid).toBeTrue();
    });

    it('should display a success message on valid form submission', () => {
        teacherComponent.teacherForm.patchValue({
            teacherId: 1,
            fullName: 'John Doe',
            contactNumber: '1234567890',
            email: 'john.doe@example.com',
            subject: 'Mathematics',
            yearsOfExperience: 5,
        });
        const submitButton = teacherFixture.debugElement.query(By.css('button[type="submit"]'));
        submitButton.nativeElement.click();

        teacherFixture.detectChanges();
        const successMessage = teacherFixture.debugElement.query(By.css('.success-message'));
        expect(successMessage).toBeTruthy();
        expect(successMessage.nativeElement.textContent).toContain('Teacher created successfully!');
    });
});



describe('CourseCreateComponent Tests', () => {
    let courseFixture: ComponentFixture<CourseCreateComponent>;
    let courseComponent: CourseCreateComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CourseCreateComponent],
            imports: [ReactiveFormsModule],
            providers: [FormBuilder]
        }).compileComponents();

        courseFixture = TestBed.createComponent(CourseCreateComponent);
        courseComponent = courseFixture.componentInstance;
        courseFixture.detectChanges();
    });
    it('should create the component', () => {
        expect(courseComponent).toBeTruthy();
    });

    it('should initialize the form with default values', () => {
        const form = courseComponent.courseForm.value;
        expect(form).toEqual({
            courseId: 0,
            courseName: '',
            description: '',
            teacherId: null,
        });
    });

    it('should mark form as invalid if required fields are empty', () => {
        courseComponent.courseForm.patchValue({
            courseName: '',
            description: '',
            teacherId: null,
        });
        expect(courseComponent.courseForm.invalid).toBeTrue();
    });

    it('should display a success message on valid form submission', () => {
        courseComponent.courseForm.patchValue({
            courseId: 1,
            courseName: 'Algebra 101',
            description: 'Introduction to Algebra',
            teacherId: 1,
        });
        const submitButton = courseFixture.debugElement.query(By.css('button[type="submit"]'));
        submitButton.nativeElement.click();

        courseFixture.detectChanges();
        const successMessage = courseFixture.debugElement.query(By.css('.success-message'));
        expect(successMessage).toBeTruthy();
        expect(successMessage.nativeElement.textContent).toContain('Course created successfully!');
    });
});