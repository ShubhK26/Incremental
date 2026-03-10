// import { Course } from "./Course";
// import { Student } from "./Student";

export class Enrollment {
    enrollmentId: number;
    studentId: number;
    courseId: number;
    enrollmentDate: Date;

    constructor(enrollmentId: number, studentId: number, courseId: number, enrollmentDate: Date) {
        this.enrollmentId = enrollmentId;
        this.studentId = studentId;
        this.courseId = courseId;
        this.enrollmentDate = enrollmentDate;
    }

    logAttributes(): void {
        console.log('enrollmentId:', this.enrollmentId);
        console.log('studentId:', this.studentId);
        console.log('courseId:', this.courseId);
        console.log('enrollmentDate:', this.enrollmentDate);
    }
}