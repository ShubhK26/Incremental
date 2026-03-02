package com.edutech.progressive.controller;
import com.edutech.progressive.entity.Attendance;
import com.edutech.progressive.service.impl.AttendanceServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    AttendanceServiceImpl attendanceService;

    @GetMapping
    public ResponseEntity<List<Attendance>> getAllAttendance() {
        try {
            List<Attendance> attendanceList = attendanceService.getAllAttendance();
            return new ResponseEntity<>(attendanceList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<Attendance> createAttendance(@RequestBody Attendance attendance) {
        try {
            Attendance attendanceSaved = attendanceService.createAttendance(attendance);
            return new ResponseEntity<>(attendanceSaved, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{attendanceId}")
    public ResponseEntity<Integer> deleteAttendance(@PathVariable int attendanceId) {
        try {
            attendanceService.deleteAttendance(attendanceId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Attendance>> getAllAttendanceByStudent(@PathVariable int studentId) {
        try {
            List<Attendance> attendanceList = attendanceService.getAttendanceByStudent(studentId);
            return new ResponseEntity<>(attendanceList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Attendance>> getAllAttendanceByCourse(@PathVariable int courseId) {
        try {
            List<Attendance> attendanceList = attendanceService.getAttendanceByCourse(courseId);
            return new ResponseEntity<>(attendanceList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>( HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}