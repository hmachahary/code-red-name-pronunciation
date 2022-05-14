package com.example.codered.namepronounciation.service;

import com.example.codered.namepronounciation.dbEntity.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
@Service
public interface UserService {
    public UserDetails editUserDetails(@RequestBody UserDetails userDetails);
}
