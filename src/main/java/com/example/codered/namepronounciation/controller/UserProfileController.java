package com.example.codered.namepronounciation.controller;

import com.example.codered.namepronounciation.dbEntity.UserDetails;
import com.example.codered.namepronounciation.repository.UserDetailsRepository;
import com.example.codered.namepronounciation.repository.UserLoginRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserProfileController {

    @Autowired
    private UserLoginRepository loginRepo;

    @Autowired
    private UserDetailsRepository userDetailsRepo;

     @PostMapping("/edit")
    public UserDetails editUserDetails(){
        return null;
     }

     @GetMapping("/findByEmail")
    public UserDetails getUserDetailsByEmail(String email){
       return userDetailsRepo.findById(email).get();
     }


}
