
// export class StudentCreateComponent {
 
// }
import { Component } from '@angular/core';
import { Student } from '../../models/Student';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-studentcreate',
  imports: [CommonModule, FormsModule],
  templateUrl: './studentcreate.component.html',
  styleUrls: ['./studentcreate.component.scss'],
})
export class StudentCreateComponent {
  student: Student;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor() {
    this.student = new Student(0, '', null, '', '', '');
  }

  onSubmit(): void {
  
    this.successMessage = null;
    this.errorMessage = null;

   
    if (this.isFormValid()) {
      this.successMessage = 'Student created successfully!';
      console.log('Student created:', this.student);
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }

  resetForm(): void {
    this.student = new Student(0, '', null, '', '', '');
    this.successMessage = null;
    this.errorMessage = null;
  }

  private isFormValid(): boolean {
    return !!(
      this.student.fullName && 
      this.student.fullName.trim() !== '' &&
      this.student.contactNumber && 
      this.student.contactNumber.trim() !== '' &&
      this.student.email && 
      this.student.email.trim() !== '' &&
      this.student.address && 
      this.student.address.trim() !== ''
    );
  }
}