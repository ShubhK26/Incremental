import { Injectable } from "@angular/core";
import { environment } from "../../../../src/environments/environment";
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
    return this.http.post<Student>(`${this.baseUrl}/student`, student);
  }

  updateStudent(student: StudentDTO): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/student/${student.studentId}`, student);
  }

  deleteStudent(studentId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/student/${studentId}`);
  }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/student`);
  }

  getStudentById(studentId: number): Observable<Student> {
    return this.http.get<any>(`${this.baseUrl}/student/${studentId}`);
  }

  // Backend API calls for Teacher

  addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${this.baseUrl}/teacher`, teacher);
  }

  updateTeacher(teacher: TeacherDTO): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.baseUrl}/teacher/${teacher.teacherId}`, teacher);
  }

  deleteTeacher(teacherId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/teacher/${teacherId}`);
  }

  getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.baseUrl}/teacher`);
  }

  getTeacherById(teacherId: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.baseUrl}/teacher/${teacherId}`);
  }

  // Backend API calls for Course

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.baseUrl}/course`, course);
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/course/${course.courseId}`, course);
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/course/${courseId}`);
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/course`);
  }

  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/course/${courseId}`);
  }

  getCoursesByTeacherId(teacherId: number): Observable<Course[]> {
      return this.http.get<Course[]>(`${this.baseUrl}/course/teacher/${teacherId}`);
    }

  // Backend API calls for Enrollment

  createEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${this.baseUrl}/enrollment`, enrollment);
  }

  updateEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.baseUrl}/enrollment/${enrollment.enrollmentId}`, enrollment);
  }

  getAllEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.baseUrl}/enrollment`);
  }

  getEnrollmentById(enrollmentId: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.baseUrl}/enrollment/${enrollmentId}`);
  }

  getEnrollmentsByCourse(courseId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.baseUrl}/enrollment/course/${courseId}`);
  }

  getEnrollmentsByStudent(studentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.baseUrl}/enrollment/student/${studentId}`);
  }

  // Backend API calls for User

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${userId}`);
  }
}