import { Teacher } from "./Teacher";

export class Course {
    courseId: number;
    courseName: string;
    description: string;
    teacherId: Teacher;
  
    constructor(courseId: number, courseName: string, description: string, teacherId: Teacher) {
      this.courseId = courseId;
      this.courseName = courseName;
      this.description = description;
      this.teacherId = teacherId;
    }
  
    logAttributes?(): void {
      console.log('courseId:', this.courseId);
      console.log('courseName:', this.courseName);
      console.log('description:', this.description);
      console.log('teacherId:', this.teacherId);
    }
  }