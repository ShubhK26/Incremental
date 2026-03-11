import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Teacher } from '../../models/Teacher';

@Component({
    selector: 'app-teachersample',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './teachersample.component.html',
    styleUrls: ['./teachersample.component.scss']
})
export class TeacherSampleComponent {
    teacher: Teacher;

    constructor() {
        // Initialize with sample data
        this.teacher = new Teacher(
            1,
            'Dr. Jane Smith',
            '9876543210',
            'jane.smith@example.com',
            'Mathematics',
            15
        );
    }

    logTeacherAttributes(): void {
        this.teacher.logAttributes();
    }
}