import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { StudentCreateComponent } from '../app/educonnect/components/studentcreate/studentcreate.component';
import { TeacherArrayComponent } from '../app/educonnect/components/teacherarray/teacherarray.component';
import { Student } from '../app/educonnect/models/Student';
import { Teacher } from '../app/educonnect/models/Teacher';

describe('StudentCreateComponent', () => {
    let component: StudentCreateComponent;
    let fixture: ComponentFixture<StudentCreateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule], // Required for two-way binding with [(ngModel)]
            declarations: [StudentCreateComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StudentCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Trigger initial data binding
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with an empty student object', () => {
        expect(component.student).toEqual(
            new Student(0, '', null, '', '', '')
        );
    });

    it('should display an error message if the form is invalid and submitted', () => {
        const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

        submitButton.nativeElement.click();
        fixture.detectChanges();

        const errorMessage = fixture.debugElement.query(By.css('.error-message'));
        expect(errorMessage).toBeTruthy();
        expect(errorMessage.nativeElement.textContent).toContain('Please fill in all required fields.');
    });

    it('should display a success message if the form is valid and submitted', () => {
        component.student = new Student(
            1,
            'John Doe',
            new Date('2000-01-01'),
            '1234567890',
            'john.doe@example.com',
            '123 Main Street'
        );
        fixture.detectChanges();
    
        const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
        submitButton.nativeElement.click();
        fixture.detectChanges();
    
        const successMessage = fixture.debugElement.query(By.css('.success-message'));
        expect(successMessage).toBeTruthy();
        expect(successMessage.nativeElement.textContent).toContain('Student created successfully!');
    });
    
});

describe('TeacherArrayComponent', () => {
    let component: TeacherArrayComponent;
    let fixture: ComponentFixture<TeacherArrayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TeacherArrayComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TeacherArrayComponent);
        component = fixture.componentInstance;
    
        // Add mock teacher data using the Teacher class
        component.teachers = [
            new Teacher(1, 'Jane Smith', '9876543210', 'jane.smith@example.com', 'Mathematics', 10),
            new Teacher(2, 'John Doe', '1234567890', 'john.doe@example.com', 'Science', 8),
        ];
    
        fixture.detectChanges();
    });
    

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should render the list of teachers', () => {
        const teacherCards = fixture.debugElement.queryAll(By.css('.teacher-card'));
        expect(teacherCards.length).toBe(2); // Ensure 2 teacher cards are rendered

        // Check the content of the first teacher card
        expect(teacherCards[0].nativeElement.textContent).toContain('Jane Smith');
        expect(teacherCards[0].nativeElement.textContent).toContain('Mathematics');

        // Check the content of the second teacher card
        expect(teacherCards[1].nativeElement.textContent).toContain('John Doe');
        expect(teacherCards[1].nativeElement.textContent).toContain('Science');
    });

});
