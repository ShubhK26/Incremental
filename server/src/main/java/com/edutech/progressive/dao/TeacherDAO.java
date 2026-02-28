package com.edutech.progressive.dao;

import com.edutech.progressive.entity.Teacher;

import java.util.List;

public interface TeacherDAO {
    int addTeacher(Teacher teacher);
    Teacher getTeacherById(int teacherId);
    void updateTeacher(Teacher teacher);
    void deleteTeacher(int teacherId) ;
    List<Teacher> getAllTeachers();
}
