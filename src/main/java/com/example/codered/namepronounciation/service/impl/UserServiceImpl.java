package com.example.codered.namepronounciation.service.impl;

import com.example.codered.namepronounciation.dbEntity.AllEmployee;
import com.example.codered.namepronounciation.dbEntity.AudioTable;
import com.example.codered.namepronounciation.dbEntity.UserDetails;
import com.example.codered.namepronounciation.dbEntity.Users;
import com.example.codered.namepronounciation.repository.AudioRepository;
import com.example.codered.namepronounciation.repository.UserDetailsRepository;
import com.example.codered.namepronounciation.repository.UserRepository;
import com.example.codered.namepronounciation.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.persistence.EntityNotFoundException;
import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserDetailsRepository userDetailsRepository;

    @Autowired
    private AudioRepository audioRepository;

    @Override
    public Users createUser(Users userRequest) {
        return userRepository.save(userRequest);
    }

    @Override
    public UserDetails getUserDetails(String email) {
        if(userDetailsRepository.findByEmailIgnoreCase(email).isPresent()) {
            UserDetails userDetails = userDetailsRepository.findByEmailIgnoreCase(email).get();
            return userDetails;
        }else{
            throw new EntityNotFoundException("User with email ID = " + email + " not found.");
        }
    }
    
    @Override
    public UserDetails editUserDetails(UserDetails userDetails, String email){
        Date date = new Date();
        userDetailsRepository.updateProfile(userDetails.getName(), userDetails.getDob(), userDetails.getPhone(), userDetails.getSkills(), userDetails.getDesignation(), userDetails.getAbout(), userDetails.getModifiedBy(), email, date, userDetails.getCountry(), userDetails.getOfficeAddress(), userDetails.getResedentialAddress(), userDetails.getOptOut() );
        
        return userDetails;
    }

    @Override
    public AllEmployee getAllEmployee(){
       List<UserDetails> response_UserDetails = userDetailsRepository.findAll();
       List<AudioTable> response_AudioTable = audioRepository.findAll();
       AllEmployee allEmployee = new AllEmployee();
       allEmployee.setUserDetails(response_UserDetails);
       allEmployee.setAudioTable(response_AudioTable);
       return allEmployee;
    }

    @Override
    public List<UserDetails> getAllUsers() {
        List<UserDetails> userDetails = userDetailsRepository.findAll();
        return userDetails;
    }
}
