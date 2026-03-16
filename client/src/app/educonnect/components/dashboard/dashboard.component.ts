import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../models/Course';
import { Enrollment } from '../../models/Enrollment';
import { Student } from '../../models/Student';
import { EduConnectService } from '../../services/educonnect.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  teacherDetails: any;
  studentDetails: any;
  courses: Course[] = [];
  enrollments: Enrollment[] = [];
  students: Student[] = [];

  role: string | null | undefined;
  userId: number | undefined;
  studentId: number = 0;
  teacherId: number = 0;

  selectedCourseId: number | undefined;
  selectedCourseEnrollment: Enrollment[] = [];

  constructor(private educonnectService: EduConnectService, private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem("role");
    this.userId = Number(localStorage.getItem("user_id"));
    this.teacherId = Number(localStorage.getItem("teacher_id"));
    this.studentId = Number(localStorage.getItem("student_id"));
    if (this.role === 'TEACHER') {
      console.log('loadTeacherData');
      this.loadTeacherData();
    }
    else {
      console.log('loadStudentData');
      this.loadStudentData();
    }
  }

  loadTeacherData(): void {
    this.educonnectService.getTeacherById(this.teacherId).subscribe({
      next: (response) => {
        this.teacherDetails = response;
      },
      error: (error) => console.log('Error loading loggedIn teacher details', error)
    });

    this.educonnectService.getCoursesByTeacherId(this.teacherId).subscribe({
      next: (response) => {
        this.courses = response;
        if (this.courses.length > 0) {
          this.selectedCourseId = this.courses[0].courseId;
          this.loadEnrollments(this.selectedCourseId);
        }
      },
      error: (error) => console.log('Error loading courses', error)
    });

    this.educonnectService.getAllStudents().subscribe({
      next: (response) => {
        this.students = response;
      },
      error: (error) => console.log('Error loading all students.', error)
    });
  }

  loadStudentData(): void {
    this.educonnectService.getStudentById(this.studentId).subscribe({
      next: (response) => {
        this.studentDetails = response;
      },
      error: (error) => console.log('Error loading loggedIn student details', error)
    });
    this.educonnectService.getEnrollmentsByStudent(this.studentId).subscribe({
      next: (response) => {
        this.enrollments = response;
        if (this.courses.length > 0) {
          this.selectedCourseId = this.courses[0].courseId;
          this.loadEnrollments(this.selectedCourseId);
        }
      },
      error: (error) => console.log('Error loading enrollments for logged in student.', error)
    });
    this.educonnectService.getAllCourses().subscribe({
      next: (response) => {
        this.courses = response;
      },
      error: (error) => console.log('Error loading all courses.', error)
    });
  }


  loadEnrollments(courseId: number): void {
    this.educonnectService.getEnrollmentsByCourse(courseId).subscribe({
      next: (response) => {
        this.selectedCourseEnrollment = response;
      },
      error: (error) => console.log('Error loading enrollments', error),
    });
  }

  onCourseSelect(course: Course): void {
    this.selectedCourseId = course.courseId;
    this.loadEnrollments(this.selectedCourseId);
  }

  navigateToEditStudent(): void {
    this.router.navigate(['educonnect/student/edit', this.studentDetails.studentId]);
  }

  deleteStudent(): void {
    if (confirm('Are you sure you want to delete your student profile?')) {
      this.educonnectService.deleteStudent(this.studentId).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => console.error('Error deleting student:', error)

      })
    }
  }

  navigateToEditTeacher(): void {
    this.router.navigate(['educonnect/teacher/edit', this.teacherDetails.teacherId]);
  }

  deleteTeacher(): void {
    if (confirm('Are you sure you want to delete your teacher profile?')) {
      this.educonnectService.deleteTeacher(this.teacherId).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => console.error('Error deleting teacher:', error)

      })
    }
  }

  navigateToEditCourse(courseId: number): void {
    this.router.navigate(['educonnect/course/edit', courseId]);
  }

  deleteCourse(courseId: number): void {
    if (confirm('Are you sure you want to delete your course profile?')) {
      this.educonnectService.deleteCourse(courseId).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => console.error('Error deleting course:', error)

      })
    }
  }
}
