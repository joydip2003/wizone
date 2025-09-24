package com.examly.springapp.exceptions;

public class DuplicateUserException extends RuntimeException {

    public DuplicateUserException(String s){
        super(s);
    }

}
