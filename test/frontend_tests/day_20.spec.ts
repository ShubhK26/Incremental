import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EnrollmentComponent } from '../app/educonnect/components/enrollment/enrollment.component';

describe('EnrollmentComponent', () => {
    let component: EnrollmentComponent;
    let fixture: ComponentFixture<EnrollmentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule], // Required for Reactive Forms
            declarations: [EnrollmentComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EnrollmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Trigger initial data binding
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form with default values', () => {
        const form = component.enrollmentForm.value;
        expect(form).toEqual({
            enrollmentId: null,
            studentId: null,
            courseId: null,
            enrollmentDate: null,
        });
    });

    it('should mark form as invalid when required fields are missing', () => {
        component.enrollmentForm.patchValue({
            studentId: null,
            courseId: null,
            enrollmentDate: null,
        });
        expect(component.enrollmentForm.invalid).toBeTrue();
    });

    it('should mark form as valid when all required fields are filled', () => {
        component.enrollmentForm.patchValue({
            enrollmentId: 1,
            studentId: 101,
            courseId: 202,
            enrollmentDate: new Date('2024-01-01'),
        });
        expect(component.enrollmentForm.valid).toBeTrue();
    });

    it('should reset the form when the reset button is clicked', () => {
        component.enrollmentForm.patchValue({
            enrollmentId: 1,
            studentId: 101,
            courseId: 202,
            enrollmentDate: new Date('2024-01-01'),
        });

        const resetButton = fixture.debugElement.query(By.css('button[type="button"]'));
        resetButton.nativeElement.click(); // Trigger reset
        fixture.detectChanges();

        const form = component.enrollmentForm.value;
        expect(form).toEqual({
            enrollmentId: null,
            studentId: null,
            courseId: null,
            enrollmentDate: null,
        });
    });

    it('should display a success message when the form is submitted with valid data', () => {
        component.enrollmentForm.patchValue({
            enrollmentId: 1,
            studentId: 101,
            courseId: 202,
            enrollmentDate: new Date('2024-01-01'),
        });
    
        const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
        submitButton.nativeElement.click(); // Trigger form submission
        fixture.detectChanges(); // Update DOM

        setTimeout(() => {
            const successMessage = fixture.debugElement.query(By.css('.success-message'));
            expect(successMessage).toBeTruthy();
            expect(successMessage.nativeElement.textContent).toContain('Enrollment created successfully!');
            expect(component.errorMessage).toBeNull();
        }, 50);
    });
    
});

