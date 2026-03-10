export class UserRegistrationDTO {
    username: string;
    password: string;
    role: string;
    fullName: string;
    contactNumber: string;
    email: string;
    subject?: string;
    yearsOfExperience?: number;
    dateOfBirth?: Date;
    address?: string;
  
    constructor(username: string, password: string, role: string, fullName: string, contactNumber: string, email: string, subject?: string, yearsOfExperience?: number, dateOfBirth?: Date, address?: string) {
      this.username = username;
      this.password = password;
      this.role = role;
      this.fullName = fullName;
      this.contactNumber = contactNumber;
      this.email = email;
      this.subject = subject;
      this.yearsOfExperience = yearsOfExperience;
      this.dateOfBirth = dateOfBirth;
      this.address = address;
    }
  }