package com.example.codered.namepronounciation.service;

import com.example.codered.namepronounciation.dbEntity.UserLogin;
import com.example.codered.namepronounciation.model.LoginResponse;
import org.springframework.stereotype.Service;

@Service
public interface LoginService {
    LoginResponse authenticateUser(UserLogin userRequest) throws IllegalAccessException;
}
