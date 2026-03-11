import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../../models/Student';

@Component({
    selector: 'app-studentsample',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './studentsample.component.html',
    styleUrls: ['./studentsample.component.scss']
})
export class StudentSampleComponent {
    student: Student;

    constructor() {

        this.student = new Student(
            1,
            'John Doe',
            new Date('1995-05-15'),
            '9876543210',
            'john.doe@example.com',
            '123 Main Street, City, State'
        );
    }

    logStudentAttributes(): void {
        this.student.logAttributes();
    }
}