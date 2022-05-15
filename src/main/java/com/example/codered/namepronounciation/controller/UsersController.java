package com.example.codered.namepronounciation.controller;

import com.example.codered.namepronounciation.dbEntity.UserDetails;
import com.example.codered.namepronounciation.dbEntity.Users;
import com.example.codered.namepronounciation.repository.UserDetailsRepository;
import com.example.codered.namepronounciation.repository.UserRepository;
import com.example.codered.namepronounciation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/users")
@Validated
public class UsersController {
    @Autowired
    private UserService userService;

    @PostMapping()
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Users> createUser(@Valid @RequestBody Users request) {
        return new ResponseEntity<>(userService.createUser(request), HttpStatus.OK);
    }

    @GetMapping("/{email}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserDetails> getUserDetails(@PathVariable(value = "email") String email) {
        return new ResponseEntity<>(userService.getUserDetails(email), HttpStatus.OK);
    }

    @PutMapping("/{email}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserDetails> editUserDetails(@PathVariable(name = "email") String email, @Valid @RequestBody UserDetails request) {
        return new ResponseEntity<>(userService.editUserDetails(request, email), HttpStatus.OK);
    }

}
