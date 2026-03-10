export class TeacherDTO {
    teacherId: number;
    username: string;
    password: string;
    fullName: string;
    contactNumber: string;
    email: string;
    specialty: string;
    yearsOfExperience: number;
  
    constructor( teacherId: number, username: string, password: string, fullName: string, contactNumber: string, email: string, specialty: string, yearsOfExperience: number
    ) {
      this.teacherId = teacherId;
      this.username = username;
      this.password = password;
      this.fullName = fullName;
      this.contactNumber = contactNumber;
      this.email = email;
      this.specialty = specialty;
      this.yearsOfExperience = yearsOfExperience;
    }
  }