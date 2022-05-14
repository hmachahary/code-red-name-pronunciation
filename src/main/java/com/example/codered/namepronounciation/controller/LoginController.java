package com.example.codered.namepronounciation.controller;

import com.example.codered.namepronounciation.dbEntity.UserLogin;
import com.example.codered.namepronounciation.model.LoginResponse;
import com.example.codered.namepronounciation.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateUser(@RequestBody UserLogin request) {
        try{
            LoginResponse loginResponse = loginService.authenticateUser(request);
            return new ResponseEntity<>(loginResponse, HttpStatus.OK);
        }catch (IllegalAccessException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }
}
