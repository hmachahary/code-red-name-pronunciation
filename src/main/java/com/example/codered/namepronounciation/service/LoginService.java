package com.example.codered.namepronounciation.service;

import com.example.codered.namepronounciation.dbEntity.UserLogin;
import com.example.codered.namepronounciation.model.LoginResponse;

public interface LoginService {
    LoginResponse authenticateUser(UserLogin userRequest) throws IllegalAccessException;
}
