
package com.edutech.progressive.service.impl;
import com.edutech.progressive.entity.Attendance;
import com.edutech.progressive.repository.AttendanceRepository;
import com.edutech.progressive.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    @Autowired
    AttendanceRepository attendanceRepository;

    @Override
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    @Override
    public Attendance createAttendance(Attendance attendance) {
        if (attendanceRepository.findByCourse_CourseIdAndStudent_StudentIdAndAttendanceDate(
                attendance.getCourse().getCourseId(),
                attendance.getStudent().getStudentId(),
                attendance.getAttendanceDate()).isPresent()) {
            throw new RuntimeException("Attendance for this student and course on the given date already exists.");
        }
        return attendanceRepository.save(attendance);
    }

    @Override
    public void deleteAttendance(int attendanceId) {
        if (!attendanceRepository.existsById(attendanceId)) {
            throw new RuntimeException("Attendance record not found with ID: " + attendanceId);
        }
        attendanceRepository.deleteById(attendanceId);
    }

    @Override
    public List<Attendance> getAttendanceByStudent(int studentId) {
        return attendanceRepository.findByStudent_StudentId(studentId);
    }

    @Override
    public List<Attendance> getAttendanceByCourse(int courseId) {
        return attendanceRepository.findByCourse_CourseId(courseId);
    }
}
