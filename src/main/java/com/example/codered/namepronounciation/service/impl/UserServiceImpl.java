package com.example.codered.namepronounciation.service.impl;

import com.example.codered.namepronounciation.dbEntity.AllEmployee;
import com.example.codered.namepronounciation.dbEntity.AudioTable;
import com.example.codered.namepronounciation.dbEntity.UserDetails;
import com.example.codered.namepronounciation.dbEntity.Users;
import com.example.codered.namepronounciation.repository.AudioRepository;
import com.example.codered.namepronounciation.repository.UserDetailsRepository;
import com.example.codered.namepronounciation.repository.UserRepository;
import com.example.codered.namepronounciation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.persistence.EntityNotFoundException;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserDetailsRepository userDetailsRepository;

    @Override
    public Users createUser(Users userRequest) {
        return userRepository.save(userRequest);
    }

    @Override
    public UserDetails getUserDetails(String email) {
        if(userDetailsRepository.findById(email).isPresent()) {
            UserDetails userDetails = userDetailsRepository.findById(email).get();
            return userDetails;
        }else{
            throw new EntityNotFoundException("User with email ID" + email + " not found.");
        }
    }

    @Autowired
    private UserDetailsRepository userDetailsRepo;

    @Autowired
    private AudioRepository audioRepository;

    public UserDetails editUserDetails(@RequestBody UserDetails userDetails){
        Date date = new Date();
        userDetailsRepo.updateProfile(userDetails.getName(), userDetails.getDob(), userDetails.getCountry(), userDetails.getOfficeAddress(), userDetails.getResedentialAddress(), userDetails.getPhone(), userDetails.getSkills(), userDetails.getDesignation(), userDetails.getEmail(), userDetails.getModifiedBy(), date );
        return userDetails;
    }

    public AllEmployee getAllEmployee(){
       List<UserDetails> response_UserDetails = userDetailsRepo.findAll();
       List<AudioTable> response_AudioTable = audioRepository.findAll();
       AllEmployee allEmployee = new AllEmployee();
       allEmployee.setUserDetails(response_UserDetails);
       allEmployee.setAudioTable(response_AudioTable);
       return allEmployee;
    }
}
