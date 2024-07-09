package PointOfSales.ProjectPOS.Exception;

import PointOfSales.ProjectPOS.Utils.ResponseMessage;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;


import java.util.*;
import java.util.regex.Pattern;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseMessage handleValidationExceptions(MethodArgumentNotValidException ex) {
        ResponseMessage response = new ResponseMessage();
        List<String> errorMessages = new ArrayList<>();

        ex.getBindingResult().getFieldErrors().forEach(error -> {
            errorMessages.add(error.getDefaultMessage());
        });

        response.setStatus("error");
        response.setMessage(String.join(", ", errorMessages));

        return response;
    }
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ResponseMessage> handleIllegalArgumentExceptions(IllegalArgumentException ex) {
        ResponseMessage response = new ResponseMessage();
        response.setStatus("error");
        response.setMessage(ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

//    @ExceptionHandler(SpecialCharacterException.class)
//    public ResponseMessage handleSpecialCharacterException(SpecialCharacterException ex){
//        ResponseMessage response = new ResponseMessage();
//        response.setStatus("error");
//        response.setMessage(ex.getMessage());
//        return response;
//    }

//    public static boolean isValidInput(String input) {
//        Pattern pattern = Pattern.compile("^[a-zA-Z0-9\\s]+$");
//        return pattern.matcher(input).matches();
//    }

    @ExceptionHandler(NumberFormatException.class)
    public ResponseEntity<Object> handleNumberFormatException(NumberFormatException ex) {
        ResponseMessage response = new ResponseMessage();
        response.setStatus("error");
        response.setMessage("Id tidak valid");

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    protected ResponseEntity<ResponseMessage> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, WebRequest request) {
        ResponseMessage response = new ResponseMessage();
        response.setStatus("error");
        response.setMessage("Nilai pada inputan tidak valid");

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}