package com.example.codered.namepronounciation.service.impl;

import com.example.codered.namepronounciation.dbEntity.Users;
import com.example.codered.namepronounciation.model.LoginRequest;
import com.example.codered.namepronounciation.model.LoginResponse;
import com.example.codered.namepronounciation.repository.UserDetailsRepository;
import com.example.codered.namepronounciation.repository.UserRepository;
import com.example.codered.namepronounciation.service.LoginService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDetailsRepository userDetailsRepo;

    public LoginResponse authenticateUser(LoginRequest userRequest) throws IllegalAccessException {
        Users userInDb = userRepository.findByEmailIgnoreCase(userRequest.getEmail()).orElse(new Users());
        if(userRequest.getPassword().equals(userInDb.getPassword())){
            LoginResponse loginResponse = new LoginResponse();
            BeanUtils.copyProperties(userInDb,loginResponse);
            loginResponse.setAuthenticated(true);
            return loginResponse;
        }else{
            throw new IllegalAccessException("Invalid user email or password");
        }

    }

}
