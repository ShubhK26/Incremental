import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from '../app/auth/components/login/login.component';
import { RegistrationComponent } from '../app/auth/components/registration/registration.component';

describe('Auth Components Test Suite', () => {
  let loginComponent: LoginComponent;
  let loginFixture: ComponentFixture<LoginComponent>;
  let registrationComponent: RegistrationComponent;
  let registrationFixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, RegistrationComponent],
      imports: [ReactiveFormsModule, FormsModule],
    }).compileComponents();

    // Initialize LoginComponent
    loginFixture = TestBed.createComponent(LoginComponent);
    loginComponent = loginFixture.componentInstance;
    loginFixture.detectChanges();

    // Initialize RegistrationComponent
    registrationFixture = TestBed.createComponent(RegistrationComponent);
    registrationComponent = registrationFixture.componentInstance;
    registrationFixture.detectChanges();
  });

  // Login Component Tests
  describe('LoginComponent', () => {
    it('should create the login component', () => {
      expect(loginComponent).toBeTruthy();
    });

    it('should initialize login form with empty fields', () => {
      const loginForm = loginComponent.loginForm;
      expect(loginForm.get('username')?.value).toBe('');
      expect(loginForm.get('password')?.value).toBe('');
    });

    it('should validate username and password as required', () => {
      const loginForm = loginComponent.loginForm;
      const usernameControl = loginForm.get('username');
      const passwordControl = loginForm.get('password');

      usernameControl?.setValue('');
      passwordControl?.setValue('');

      expect(usernameControl?.valid).toBeFalsy();
      expect(passwordControl?.valid).toBeFalsy();
    });

    it('should display an error message if form is invalid on submit', () => {
      const loginForm = loginComponent.loginForm;
      loginComponent.onSubmit();

      expect(loginComponent.errorMessage).toBe('Please fill out all fields correctly.');
    });

    it('should display a success message on valid form submission', () => {
      const loginForm = loginComponent.loginForm;

      loginForm.setValue({
        username: 'testuser',
        password: 'Test1234',
      });

      loginComponent.onSubmit();

      expect(loginComponent.successMessage).toBe('Login successful!');
      expect(loginComponent.errorMessage).toBeNull();
    });
  });

  // Registration Component Tests
  describe('RegistrationComponent', () => {
    it('should create the registration component', () => {
      expect(registrationComponent).toBeTruthy();
    });

    it('should initialize registration form with empty fields', () => {
      const registrationForm = registrationComponent.registrationForm;

      expect(registrationForm.get('username')?.value).toBe('');
      expect(registrationForm.get('email')?.value).toBe('');
      expect(registrationForm.get('password')?.value).toBe('');
      expect(registrationForm.get('role')?.value).toBe('');
    });

    it('should validate required fields for registration form', () => {
      const registrationForm = registrationComponent.registrationForm;

      registrationForm.get('username')?.setValue('');
      registrationForm.get('email')?.setValue('');
      registrationForm.get('password')?.setValue('');
      registrationForm.get('role')?.setValue('');

      expect(registrationForm.get('username')?.valid).toBeFalsy();
      expect(registrationForm.get('email')?.valid).toBeFalsy();
      expect(registrationForm.get('password')?.valid).toBeFalsy();
      expect(registrationForm.get('role')?.valid).toBeFalsy();
    });

    it('should display a success message on valid registration', () => {
      const registrationForm = registrationComponent.registrationForm;

      registrationForm.setValue({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'Test1234',
        role: 'TEACHER',
        fullName: 'Test User',
        contactNumber: '1234567890',
        subject: 'Maths',
        yearsOfExperience: 5,
        dateOfBirth: null,
        address: '',
      });

      registrationComponent.onSubmit();

      expect(registrationComponent.successMessage).toBe('Registration successful!');
      expect(registrationComponent.errorMessage).toBeNull();
    });

    it('should display an error message for invalid registration form', () => {
      const registrationForm = registrationComponent.registrationForm;

      registrationForm.setValue({
        username: '',
        email: 'invalid-email',
        password: 'short',
        role: '',
        fullName: '',
        contactNumber: '',
        subject: '',
        yearsOfExperience: null,
        dateOfBirth: null,
        address: '',
      });

      registrationComponent.onSubmit();

      expect(registrationComponent.errorMessage).toBe('Please fill out all fields correctly.');
      expect(registrationComponent.successMessage).toBeNull();
    });
  });
});
