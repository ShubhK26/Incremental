import { Course } from "../app/educonnect/models/Course";
import { Student } from "../app/educonnect/models/Student";
import { Teacher } from "../app/educonnect/models/Teacher";
import { Enrollment } from "../app/educonnect/models/Enrollment";


describe('Model Classes Test Suite', () => {
  it('should create a Student object and log its attributes', () => {
    const student = new Student(
      1,
      'John Doe',
      new Date('1990-01-01'),
      '1234567890',
      'john@example.com',
      '123 Main Street'
    );

    spyOn(console, 'log');
    student.logAttributes();

    expect(console.log).toHaveBeenCalledWith('studentId:', 1);
    expect(console.log).toHaveBeenCalledWith('fullName:', 'John Doe');
    expect(console.log).toHaveBeenCalledWith('dateOfBirth:', new Date('1990-01-01'));
    expect(console.log).toHaveBeenCalledWith('contactNumber:', '1234567890');
    expect(console.log).toHaveBeenCalledWith('email:', 'john@example.com');
    expect(console.log).toHaveBeenCalledWith('address:', '123 Main Street');
  });

  it('should create a Teacher object and log its attributes', () => {
    const teacher = new Teacher(
      1,
      'Dr. Jane Smith',
      '9876543210',
      'jane@example.com',
      'English',
      15
    );

    spyOn(console, 'log');
    teacher.logAttributes();

    expect(console.log).toHaveBeenCalledWith('teacherId:', 1);
    expect(console.log).toHaveBeenCalledWith('fullName:', 'Dr. Jane Smith');
    expect(console.log).toHaveBeenCalledWith('subject:', 'English');
    expect(console.log).toHaveBeenCalledWith('contactNumber:', '9876543210');
    expect(console.log).toHaveBeenCalledWith('email:', 'jane@example.com');
    expect(console.log).toHaveBeenCalledWith('yearsOfExperience:', 15);
  });

  it('should create a Course object and log its attributes', () => {
    const course = new Course(
      1,
      'English',
      'English literature and language',
      10
    );

    spyOn(console, 'log');
    course.logAttributes();

    expect(console.log).toHaveBeenCalledWith('courseId:', 1);
    expect(console.log).toHaveBeenCalledWith('courseName:', 'English');
    expect(console.log).toHaveBeenCalledWith('description:', 'English literature and language');
    expect(console.log).toHaveBeenCalledWith('teacherId:', 10);
  });

  it('should create an Enrollment object and log its attributes', () => {
    const enrollment = new Enrollment(
      1,
      101,
      202,
      new Date('2024-12-01T10:00:00')
    );

    spyOn(console, 'log');
    enrollment.logAttributes();

    expect(console.log).toHaveBeenCalledWith('enrollmentId:', 1);
    expect(console.log).toHaveBeenCalledWith('studentId:', 101);
    expect(console.log).toHaveBeenCalledWith('courseId:', 202);
    expect(console.log).toHaveBeenCalledWith('enrollmentDate:', new Date('2024-12-01T10:00:00'));
  });
});
