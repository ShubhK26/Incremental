import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
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
    return this.http.post<Student>();
  }

  updateStudent(student: StudentDTO): Observable<Student> {
    return this.http.put<Student>();
  }

  deleteStudent(studentId: number): Observable<any> {
    return this.http.delete<any>();
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>();
  }

  getStudentById(studentId: number): Observable<Student> {
    return this.http.get<Student>();
  }

  // Backend API calls for Teacher

  addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>();
  }

  updateTeacher(teacher: TeacherDTO): Observable<Teacher> {
    return this.http.put<Teacher>();
  }

  deleteTeacher(teacherId: number): Observable<any> {
    return this.http.delete<any>();
  }

  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>();
  }

  getTeacherById(teacherId: number): Observable<Teacher> {
    return this.http.get<Teacher>();
  }

  // Backend API calls for Course

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>();
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>();
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete<any>();
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>();
  }

  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>();
  }

  getCoursesByTeacherId(teacherId: number): Observable<Course[]> {
      return this.http.get<Course[]>();
    }

  // Backend API calls for Enrollment

  createEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>();
  }

  updateEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.put<Enrollment>();
  }

  getAllEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>();
  }

  getEnrollmentById(enrollmentId: number): Observable<Enrollment> {
    return this.http.get<Enrollment>();
  }

  getEnrollmentsByCourse(courseId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>();
  }

  getEnrollmentsByStudent(studentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>();
  }

  // Backend API calls for User

  getUserById(userId: number): Observable<User> {
      return this.http.get<User>();
  }
}
