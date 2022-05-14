package com.example.codered.namepronounciation.service;

import com.example.codered.namepronounciation.model.LoginRequest;
import com.example.codered.namepronounciation.model.LoginResponse;
import org.springframework.stereotype.Service;

@Service
public interface LoginService {
    LoginResponse authenticateUser(LoginRequest userRequest) throws IllegalAccessException;
}
