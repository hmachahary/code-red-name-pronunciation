package com.example.codered.namepronounciation.controller;

import com.azure.core.annotation.Get;
import com.example.codered.namepronounciation.dbEntity.AllEmployee;
import com.example.codered.namepronounciation.dbEntity.UserDetails;
import com.example.codered.namepronounciation.repository.UserDetailsRepository;
import com.example.codered.namepronounciation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserProfileController {

    @Autowired
    private UserDetailsRepository userDetailsRepo;

    @Autowired
    UserService userService;

    @GetMapping("/findByEmail")
    public UserDetails getUserDetailsByEmail(String email){
       return userDetailsRepo.findById(email.toLowerCase()).get();
     }

    @GetMapping("/getAll")
    public ResponseEntity<AllEmployee> getAllUserDetails() {
        AllEmployee response = userService.getAllEmployee();
        return ResponseEntity.ok(response);
    }
}
