package com.example.codered.namepronounciation.controller;

import com.example.codered.namepronounciation.dbEntity.UserDetails;
import com.example.codered.namepronounciation.dbEntity.UserLogin;
import com.example.codered.namepronounciation.model.LoginResponse;
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

//    @PostMapping("/login")
//    public LoginResponse loginDetails(@RequestBody UserLogin request) throws IllegalAccessException {
//        UserLogin userInDb = loginRepo.findById(request.getEmail()).orElse(new UserLogin());
//        if(request.getPassword().equals(userInDb.getPassword())){
//            LoginResponse loginResponse = new LoginResponse();
//            BeanUtils.copyProperties(userInDb,loginResponse);
//            return loginResponse;
//        }
//        else
//            throw new IllegalAccessException("Invalid user email or password");
//    }

     @PostMapping("/edit")
    public UserDetails editUserDetails(){
        return null;
     }

     @GetMapping("/findByEmail")
    public UserDetails getUserDetailsByEmail(String email){
       return userDetailsRepo.findById(email).get();
     }


}
