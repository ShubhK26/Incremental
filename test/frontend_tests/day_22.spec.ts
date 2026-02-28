import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '../app/auth/services/auth.service';
import { LoginComponent } from '../app/auth/components/login/login.component';
import { environment } from '../environments/environment';
import { RegistrationComponent } from '../app/auth/components/registration/registration.component';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthModule } from '../app/auth/auth.module';
import { User } from '../app/educonnect/models/User';
import { UserRegistrationDTO } from '../app/educonnect/models/UserRegistrationDTO';
import { Teacher } from '../app/educonnect/models/Teacher';
import { Student } from '../app/educonnect/models/Student';
import { Course } from '../app/educonnect/models/Course';

describe("AuthService", () => {
    let authService: AuthService;
    let httpMock: HttpTestingController;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [AuthService],
      });
  
      authService = TestBed.inject(AuthService);
      httpMock = TestBed.inject(HttpTestingController);
    });
  
    afterEach(() => {
      httpMock.verify();
    });
  
    it("should be created", () => {
      expect(authService).toBeTruthy();
    });
  
    describe("login", () => {
      it("should make a POST request to login", () => {
        const mockTeacher: Teacher = {
          teacherId: 101, fullName: 'Dr. John', email: 'john@example.com', subject: 'English', yearsOfExperience: 10, contactNumber: '9876543210',
          logAttributes() { }
        };
        const user: User = new User(1, "johnkeats", "Johnkeats@12", "TEACHER", undefined, mockTeacher);
        authService.login(user).subscribe((result) => {
          expect(result).not.toBeNull();
        });
  
        const req = httpMock.expectOne(`${environment.apiUrl}/user/login`);
        expect(req.request.method).toBe("POST");
        expect(req.request.body).toEqual(user);
  
        req.flush(user);
      });
    });
  
    describe("getToken", () => {
      it("should get the token from localStorage", () => {
        const token = "testtoken";
        spyOn(localStorage, "getItem").and.returnValue(token);
  
        const result = authService.getToken();
  
        expect(localStorage.getItem).toHaveBeenCalledWith("token");
        expect(result).toEqual(token);
      });
    });
  
    describe("createUser", () => {
      it("should make a POST request to create a user", () => {
        const user: UserRegistrationDTO = new UserRegistrationDTO("johnkeats", "Johnkeats@12", "TEACHER", "John Keats", "9876543210", "john@gmail.com", "Maths", 10);
        const response: string = "User registered successfully";
  
        authService.createUser(user).subscribe((result) => {
          expect(result).toEqual(response);
        });
  
        const req = httpMock.expectOne(`${environment.apiUrl}/user/register`);
        expect(req.request.method).toBe("POST");
        expect(req.request.body).toEqual(user);
  
        req.flush(response);
      });
    });
  });


describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: jasmine.SpyObj<AuthService>;
    let router: jasmine.SpyObj<Router>;
    let formBuilder: FormBuilder;
  
    beforeEach(async () => {
      const authServiceSpy = jasmine.createSpyObj("AuthService", ["login"]);
      const routerSpy = jasmine.createSpyObj("Router", ["navigate"]);
  
      await TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [ReactiveFormsModule, HttpClientTestingModule],
        providers: [
          { provide: AuthService, useValue: authServiceSpy },
          { provide: Router, useValue: routerSpy },
          FormBuilder,
        ],
      }).compileComponents();
  
      // Important: Move this here to avoid issues with duplicate instantiation
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
      router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
      formBuilder = TestBed.inject(FormBuilder);
      fixture.detectChanges();
    });
  
    it("should create the component", () => {
      expect(component).toBeTruthy();
    });
  
    describe("ngOnInit", () => {
      it("should initialize the userForm with empty fields and validators", () => {
        component.ngOnInit();
        const form = component.loginForm;
        expect(form.get("username")?.value).toEqual("");
        expect(form.get("password")?.value).toEqual("");
      });
    });
  
    describe("onSubmit", () => {
      it("should not call authService.login if the form is invalid", () => {
        component.loginForm = formBuilder.group({
          username: ["", Validators.required],
          password: ["", Validators.required],
        });
        component.onSubmit();
        expect(authService.login).not.toHaveBeenCalled();
      });
  
      it("should call authService.login with the login data if the form is valid", () => {
        authService.login.and.returnValue(of({ token: "testToken" }));
        component.loginForm = formBuilder.group({
          username: ["testUser", Validators.required],
          password: ["testPassword", Validators.required],
        });
        component.onSubmit();
        expect(authService.login).toHaveBeenCalledWith({
          username: "testUser",
          password: "testPassword",
        });
      });
    });
  });
  
  describe("RegistrationComponent", () => {
    let component: RegistrationComponent;
    let fixture: ComponentFixture<RegistrationComponent>;
    let authService: AuthService;
    let formBuilder: FormBuilder;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [RegistrationComponent],
        imports: [ReactiveFormsModule, HttpClientTestingModule, AuthModule],
        providers: [
          AuthService,
          FormBuilder,
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: {
                  get: (key: string) => "john",
                },
              },
            },
          },
        ],
      }).compileComponents();
  
      // Move this here to avoid errors with duplicate TestBed instantiation
      fixture = TestBed.createComponent(RegistrationComponent);
      component = fixture.componentInstance;
      authService = TestBed.inject(AuthService);
      formBuilder = TestBed.inject(FormBuilder);
      fixture.detectChanges();
    });
  
    it("should create the component", () => {
      expect(component).toBeTruthy();
    });
  
    describe("ngOnInit", () => {
      it("should initialize the registrationForm with empty fields and validators", () => {
        component.ngOnInit();
        const form = component.registrationForm;
        expect(form.get("username")?.value).toEqual("");
        expect(form.get("password")?.value).toEqual("");
      });
    });
  });