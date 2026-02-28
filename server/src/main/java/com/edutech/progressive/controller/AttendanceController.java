package com.edutech.progressive.controller;

import com.edutech.progressive.entity.Attendance;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class AttendanceController {

    public ResponseEntity<List<Attendance>> getAllAttendance() {
        return null;
    }

    public ResponseEntity<Attendance> createAttendance(Attendance attendance) {
        return null;
    }

    public ResponseEntity<Integer> deleteAttendance(int attendanceId) {
        return null;
    }

    public ResponseEntity<List<Attendance>> getAllAttendanceByStudent(int studentId) {
        return null;
    }

    public ResponseEntity<List<Attendance>> getAllAttendanceByCourse(int courseId) {
        return null;
    }
}
