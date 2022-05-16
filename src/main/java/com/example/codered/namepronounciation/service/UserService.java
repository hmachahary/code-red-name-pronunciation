package com.example.codered.namepronounciation.service;

import com.example.codered.namepronounciation.dbEntity.AllEmployee;
import com.example.codered.namepronounciation.dbEntity.UserDetails;
import com.example.codered.namepronounciation.dbEntity.Users;
import com.example.codered.namepronounciation.model.UserDetailsResponseModel;

import java.util.List;

public interface UserService {
    Users createUser(Users userRequest);
    UserDetailsResponseModel getUserDetails(String email);
    AllEmployee getAllEmployee();
    UserDetails editUserDetails(UserDetails userDetails, String email);
    List<UserDetails> getAllUsers();
}
