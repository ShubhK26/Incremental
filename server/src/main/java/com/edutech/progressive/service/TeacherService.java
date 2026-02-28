package com.edutech.progressive.service;

import com.edutech.progressive.dto.TeacherDTO;
import com.edutech.progressive.entity.Teacher;

import java.sql.SQLException;
import java.util.List;

public interface TeacherService {

    public List<Teacher> getAllTeachers( ) throws Exception;

    public Integer addTeacher(Teacher teacher ) throws Exception;

    public List<Teacher> getTeacherSortedByExperience( ) throws Exception;

    default void emptyArrayList( ) throws Exception {
    }

    //Do not implement these methods in TeacherServiceImplArraylist.java class
    default public void updateTeacher(Teacher teacher ) throws Exception { }

    default public void deleteTeacher(int teacherId ) throws Exception { }

    default Teacher getTeacherById(int teacherId ) throws Exception { return null; }

    //Do not implement these methods in TeacherServiceImplArraylist.java and TeacherServiceImplJdbc.java class
    //Do not implement in TeacherServiceImplJpa.java until Day-13
    default public void modifyTeacherDetails(TeacherDTO teacherDTO) { }
}
