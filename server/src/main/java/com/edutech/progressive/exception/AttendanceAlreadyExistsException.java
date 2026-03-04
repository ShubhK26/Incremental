package com.edutech.progressive.exception;


public class AttendanceAlreadyExistsException extends RuntimeException{
    public AttendanceAlreadyExistsException(String msg){
        super(msg);
    }
}