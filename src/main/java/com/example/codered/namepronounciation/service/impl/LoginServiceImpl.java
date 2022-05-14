package com.example.codered.namepronounciation.service.impl;

import com.example.codered.namepronounciation.dbEntity.UserLogin;
import com.example.codered.namepronounciation.model.LoginResponse;
import com.example.codered.namepronounciation.repository.UserDetailsRepository;
import com.example.codered.namepronounciation.repository.UserLoginRepository;
import com.example.codered.namepronounciation.service.LoginService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    private UserLoginRepository loginRepo;

    @Autowired
    private UserDetailsRepository userDetailsRepo;

    public LoginResponse authenticateUser(UserLogin userRequest) throws IllegalAccessException {
        UserLogin userInDb = loginRepo.findById(userRequest.getEmail()).orElse(new UserLogin());
        if(userRequest.getPassword().equals(userInDb.getPassword())){
            LoginResponse loginResponse = new LoginResponse();
            BeanUtils.copyProperties(userInDb,loginResponse);
            return loginResponse;
        }else{
            throw new IllegalAccessException("Invalid user email or password");
        }

    }

}
