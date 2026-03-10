export class Teacher {
    teacherId: number;
    fullName: string;
    contactNumber: string;
    email: string;
    subject: string;
    yearsOfExperience: number;
  
    constructor(teacherId: number, fullName: string, contactNumber: string, email: string, subject: string, yearsOfExperience: number
    ) {
      this.teacherId = teacherId;
      this.fullName = fullName;
      this.contactNumber = contactNumber;
      this.email = email;
      this.subject = subject;
      this.yearsOfExperience = yearsOfExperience;
    }
  
    logAttributes(): void {
      console.log('teacherId:', this.teacherId);
      console.log('fullName:', this.fullName);
      console.log('subject:', this.subject);
      console.log('contactNumber:', this.contactNumber);
      console.log('email:', this.email);
      console.log('yearsOfExperience:', this.yearsOfExperience);
    }
  }