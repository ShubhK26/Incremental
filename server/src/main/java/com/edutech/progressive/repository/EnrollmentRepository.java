package com.edutech.progressive.repository;

import com.edutech.progressive.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {

    Optional<Enrollment> findByStudent_StudentIdAndCourse_CourseId(int studentId, int courseId);

    List<Enrollment> findAllByStudent_StudentId(int studentId);

    List<Enrollment> findAllByCourse_CourseId(int courseId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Enrollment e WHERE e.course.courseId = :courseId")
    void deleteByCourseId(int courseId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Enrollment e WHERE e.student.studentId = :studentId")
    void deleteByStudentId(int studentId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Enrollment e WHERE e.course.courseId IN (SELECT c.courseId FROM Course c WHERE c.teacher.teacherId = :teacherId)")
    void deleteByTeacherId(@Param("teacherId") int teacherId);

}
