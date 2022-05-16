package com.example.codered.namepronounciation.impl;

import com.example.codered.namepronounciation.dbEntity.UserDetails;
import com.example.codered.namepronounciation.dbEntity.Users;
import com.example.codered.namepronounciation.model.LoginRequest;
import com.example.codered.namepronounciation.model.LoginResponse;
import com.example.codered.namepronounciation.repository.UserRepository;
import com.example.codered.namepronounciation.service.impl.LoginServiceImpl;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;


@ExtendWith(MockitoExtension.class)
class LoginServiceImplTest {

    @InjectMocks
    private LoginServiceImpl loginService;

    @Mock
    private UserRepository userRepository;


    LoginRequest buildLoginRequest(String email, String pass) {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail(email);
        loginRequest.setPassword(pass);
        return loginRequest;
    }

    Users buildUsersRequest(){
        Users user = new Users();
        user.setEmail("A.S@w.com");
        user.setPassword("TEST");
        user.setAdmin(true);
        user.setEmpID("12345");
        user.setUserDetails(new UserDetails());
        return user;
    }

    LoginResponse buildLoginResponse(){
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setEmail("A.S@w.com");
        loginResponse.setAdmin(true);
        loginResponse.setEmpID("12345");
        loginResponse.setAuthenticated(true);
        return loginResponse;
    }

    @Test
    void authenticateUserWhenEmailOrPasswordIsWrong() throws IllegalAccessException {
        LoginRequest loginRequest = buildLoginRequest("A.S@w.com","TEST2");
        Users user = buildUsersRequest();
        Mockito.when(userRepository.findByEmailIgnoreCase(loginRequest.getEmail())).thenReturn(java.util.Optional.ofNullable(user));
        Assertions.assertThrows(IllegalAccessException.class,()->loginService.authenticateUser(loginRequest));
    }

    @Test
    void authenticateUserWhenEmailOrPasswordIsCorrect() throws IllegalAccessException {
        LoginRequest loginRequest = buildLoginRequest("A.S@w.com","TEST");
        Users user = buildUsersRequest();
        Mockito.when(userRepository.findByEmailIgnoreCase(loginRequest.getEmail())).thenReturn(java.util.Optional.ofNullable(user));
        Assert.assertEquals(buildLoginResponse(),loginService.authenticateUser(loginRequest));
    }



}