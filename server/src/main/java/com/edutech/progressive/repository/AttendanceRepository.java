package com.edutech.progressive.repository;

import com.edutech.progressive.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {

    List<Attendance> findByStudent_StudentId(int studentId);

    List<Attendance> findByCourse_CourseId(int courseId);

    Optional<Attendance> findByCourse_CourseIdAndStudent_StudentIdAndAttendanceDate(int courseId, int studentId, Date attendanceDate);

    @Transactional
    @Modifying
    @Query("DELETE FROM Attendance a WHERE a.course.courseId = :courseId")
    void deleteByCourseId(int courseId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Attendance a WHERE a.student.studentId = :studentId")
    void deleteByStudentId(int studentId);
}

