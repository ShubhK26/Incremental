import { Student } from "./Student";
import { Teacher } from "./Teacher";

export class User {
    userId: number;
    username: string;
    password: string;
    role: string;
    studentId?: Student;
    teacherId?: Teacher;
  
    constructor(userId: number, username: string, password: string, role: string, studentId?: Student, teacherId?: Teacher) {
      this.userId = userId;
      this.username = username;
      this.password = password;
      this.role = role;
      this.studentId = studentId;
      this.teacherId = teacherId;
    }
  }