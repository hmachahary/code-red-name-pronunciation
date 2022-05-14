package com.example.codered.namepronounciation.service.impl;

import com.example.codered.namepronounciation.dbEntity.UserDetails;
import com.example.codered.namepronounciation.repository.UserDetailsRepository;
import com.example.codered.namepronounciation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;

@Service
public class UserServiceImpl implements UserService {


    @Autowired
    private UserDetailsRepository userDetailsRepo;

    public UserDetails editUserDetails(@RequestBody UserDetails userDetails){
        Date date = new Date();
        userDetailsRepo.updateProfile(userDetails.getName(), userDetails.getDob(), userDetails.getCountry(), userDetails.getOfficeAddress(), userDetails.getResedentialAddress(), userDetails.getPhone(), userDetails.getSkills(), userDetails.getDesignation(), userDetails.getEmail(), userDetails.getModifiedBy(), date );

        return userDetails;
    }
}
