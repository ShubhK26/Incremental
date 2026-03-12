
// export class TeacherArrayComponent  {

 

// }
import { Component } from '@angular/core';
import { Teacher } from '../../models/Teacher';

@Component({
  selector: 'app-teacherarray',
  templateUrl: './teacherarray.component.html',
  styleUrls: ['./teacherarray.component.scss']
})
export class TeacherArrayComponent {
  teachers: Teacher[] = [];
  showDetails: boolean = true;

  constructor() {
   
    this.teachers = [
      new Teacher(1, 'Dr. Jane Smith', '9876543210', 'jane.smith@example.com', 'Mathematics', 15),
      new Teacher(2, 'Prof. John Doe', '1234567890', 'john.doe@example.com', 'Physics', 12),
      new Teacher(3, 'Ms. Sarah Wilson', '5555555555', 'sarah.wilson@example.com', 'Chemistry', 8),
      new Teacher(4, 'Mr. Michael Brown', '7777777777', 'michael.brown@example.com', 'Biology', 10)
    ];
  }

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }
}