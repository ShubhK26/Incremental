import { TestBed, ComponentFixture } from '@angular/core/testing';
import { StudentSampleComponent } from '../app/educonnect/components/studentsample/studentsample.component';
import { TeacherSampleComponent } from '../app/educonnect/components/teachersample/teachersample.component';



describe('StudentSampleComponent', () => {
    let studentFixture: ComponentFixture<StudentSampleComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [StudentSampleComponent]
        });

        studentFixture = TestBed.createComponent(StudentSampleComponent);
    });
    it('should create the student component', () => {
        const component = studentFixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should display student details', () => {
        studentFixture.detectChanges();

        const compiled = studentFixture.nativeElement;
        expect(compiled.textContent).toContain('Student Details');
        expect(compiled.textContent).toContain('Student ID:');
        expect(compiled.textContent).toContain('Full Name:');
        expect(compiled.textContent).toContain('Date of Birth:');
        expect(compiled.textContent).toContain('Contact Number:');
        expect(compiled.textContent).toContain('Email:');
        expect(compiled.textContent).toContain('Address:');
    });

});

describe('TeacherSampleComponent', () => {
    let teacherFixture: ComponentFixture<TeacherSampleComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TeacherSampleComponent]
        });

        teacherFixture = TestBed.createComponent(TeacherSampleComponent);
    });
    it('should create the teacher component', () => {
        const component = teacherFixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should display teacher details', () => {
        teacherFixture.detectChanges();

        const compiled = teacherFixture.nativeElement;
        expect(compiled.textContent).toContain('Teacher ID:');
        expect(compiled.textContent).toContain('Full Name:');
        expect(compiled.textContent).toContain('Subject:');
        expect(compiled.textContent).toContain('Contact Number:');
        expect(compiled.textContent).toContain('Email:');
        expect(compiled.textContent).toContain('Years of Experience:');
    });
});

