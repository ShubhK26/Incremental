package com.edutech.progressive.service;

import com.edutech.progressive.entity.Attendance;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface AttendanceService {

    public List<Attendance> getAllAttendance() throws Exception;

    Attendance createAttendance(Attendance attendance ) throws Exception;

    public void deleteAttendance(int attendanceId ) throws Exception;

    public List<Attendance> getAttendanceByStudent(int studentId ) throws Exception;

    public List<Attendance> getAttendanceByCourse(int courseId ) throws Exception;
}
