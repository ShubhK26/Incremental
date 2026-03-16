import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Student } from "../models/Student";
import { Teacher } from "../models/Teacher";
import { Course } from "../models/Course";
import { Enrollment } from "../models/Enrollment";
import { User } from "../models/User";
import { TeacherDTO } from "../models/TeacherDTO";
import { StudentDTO } from "../models/StudentDTO";

@Injectable({
  providedIn: "root",
})
export class EduConnectService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // Backend API calls for Student

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>('//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Student', student);
  }

  updateStudent(student: StudentDTO): Observable<Student> {
    return this.http.put<Student>('//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Student', student);
  }

  deleteStudent(studentId: number): Observable<any> {
    return this.http.delete<any>(`//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Student/${studentId}`); // for id use $
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Student');
  }

  getStudentById(studentId: number): Observable<Student> {
    return this.http.get<Student>(`//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Student/${studentId}`);
  }

  // Backend API calls for Teacher

  addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>('//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Teacher', teacher);
  }

  updateTeacher(teacher: TeacherDTO): Observable<Teacher> {
    return this.http.put<Teacher>('//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Teacher', teacher);
  }

  deleteTeacher(teacherId: number): Observable<any> {
    return this.http.delete<any>(`//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Teacher/${teacherId}`);
  }

  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>('//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Teacher');
  }

  getTeacherById(teacherId: number): Observable<Teacher> {
    return this.http.get<Teacher>(`//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Teacher/${teacherId}`);
  }

  // Backend API calls for Course

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>('//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Course', course);
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>('//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Course', course);
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete<any>(`//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Course/${courseId}`);
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Course');
  }

  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Course/${courseId}`);
  }

  getCoursesByTeacherId(teacherId: number): Observable<Course[]> {
      return this.http.get<Course[]>(`//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Teacher/${teacherId}`);
    }

  // Backend API calls for Enrollment

  createEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>('//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Enrollment', enrollment);
  }

  updateEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.put<Enrollment>('//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Enrollment', enrollment);
  }

  getAllEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>('//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Enrollment');
  }

  getEnrollmentById(enrollmentId: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Enrollment/${enrollmentId}`);
  }

  getEnrollmentsByCourse(courseId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Course/${courseId}`);
  }

  getEnrollmentsByStudent(studentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`//orchardsolveone.lntedutech.com/project/4899/proxy/3000/Student/${studentId}`);
  }

  // Backend API calls for User

  getUserById(userId: number): Observable<User> {
      return this.http.get<User>(`//orchardsolveone.lntedutech.com/project/4899/proxy/3000/User/${userId}`);
  }
}
