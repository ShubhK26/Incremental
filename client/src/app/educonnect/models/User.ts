import { Student } from "./Student";
import { Teacher } from "./Teacher";

export class User {
    userId: number;
    username: string;
    password: string;
    role: string;
    student?: Student | undefined;
    teacher?: Teacher | undefined;
  
    constructor(userId: number, username: string, password: string, role: string, student: Student | undefined, teacher: Teacher | undefined) {
      this.userId = userId;
      this.username = username;
      this.password = password;
      this.role = role;
      this.student = student;
      this.teacher = teacher;
    }
  }