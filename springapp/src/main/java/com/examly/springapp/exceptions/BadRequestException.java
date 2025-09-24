package com.examly.springapp.exceptions;

public class BadRequestException extends RuntimeException{
    public BadRequestException(String s){
        super(s);
    }
}
