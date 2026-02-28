package com.edutech.progressive.service;

import com.edutech.progressive.entity.Attendance;

import java.util.List;

public interface AttendanceService {

    List<Attendance> getAllAttendance();

    Attendance createAttendance(Attendance attendance);

    void deleteAttendance(int attendanceId);

    List<Attendance> getAttendanceByStudent(int studentId);

    List<Attendance> getAttendanceByCourse(int courseId);
}
