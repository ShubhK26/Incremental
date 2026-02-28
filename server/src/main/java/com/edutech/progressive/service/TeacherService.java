package com.edutech.progressive.service;

import com.edutech.progressive.dto.TeacherDTO;
import com.edutech.progressive.entity.Teacher;

import java.util.List;

public interface TeacherService {

    public List<Teacher> getAllTeachers();

    public Integer addTeacher(Teacher teacher);

    public List<Teacher> getTeacherSortedByExperience();

    default void emptyArrayList() {
    }

    //Do not implement these methods in TeacherServiceImplArraylist.java class
    default public void updateTeacher(Teacher teacher) { }

    default public void deleteTeacher(int teacherId) { }

    default Teacher getTeacherById(int teacherId) { return null; }

    //Do not implement these methods in TeacherServiceImplArraylist.java and TeacherServiceImplJdbc.java class
    //Do not implement in TeacherServiceImplJpa.java until Day-13
    default public void modifyTeacherDetails(TeacherDTO teacherDTO) { }
}
