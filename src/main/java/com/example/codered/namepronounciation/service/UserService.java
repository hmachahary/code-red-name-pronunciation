package com.example.codered.namepronounciation.service;

import com.example.codered.namepronounciation.dbEntity.AllEmployee;
import com.example.codered.namepronounciation.dbEntity.UserDetails;
import com.example.codered.namepronounciation.dbEntity.Users;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

public interface UserService {
    Users createUser(Users userRequest);
    UserDetails getUserDetails(String email);
    public AllEmployee getAllEmployee();
    UserDetails editUserDetails(UserDetails userDetails, String email);
}
