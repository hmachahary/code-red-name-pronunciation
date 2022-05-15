package com.example.codered.namepronounciation.service;

import com.example.codered.namepronounciation.dbEntity.UserDetails;
import com.example.codered.namepronounciation.dbEntity.Users;
import org.springframework.web.bind.annotation.RequestBody;

public interface UserService {
    Users createUser(Users userRequest);
    UserDetails getUserDetails(String email);
    UserDetails editUserDetails(UserDetails userDetails, String email);
}
