package com.example.codered.namepronounciation.service.impl;

import com.example.codered.namepronounciation.dbEntity.AllEmployee;
import com.example.codered.namepronounciation.dbEntity.AudioTable;
import com.example.codered.namepronounciation.dbEntity.UserDetails;
import com.example.codered.namepronounciation.dbEntity.Users;
import com.example.codered.namepronounciation.repository.AudioRepository;
import com.example.codered.namepronounciation.dbEntity.Address;
import com.example.codered.namepronounciation.repository.AddressRepository;
import com.example.codered.namepronounciation.repository.UserDetailsRepository;
import com.example.codered.namepronounciation.repository.UserRepository;
import com.example.codered.namepronounciation.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.persistence.EntityNotFoundException;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserDetailsRepository userDetailsRepository;

    @Autowired
    AddressRepository addressRepository;

    @Override
    public Users createUser(Users userRequest) {
        List<Address> addresses = userRequest.getUserDetails().getAddress();
        addressRepository.saveAll(new HashSet<>(addresses));
        return userRepository.save(userRequest);
    }

    @Override
    public UserDetails getUserDetails(String email) {
        if(userDetailsRepository.findByEmailIgnoreCase(email).isPresent()) {
            UserDetails userDetails = userDetailsRepository.findByEmailIgnoreCase(email).get();
            Optional<List<Address>> addresses = addressRepository.findAllByEmpid(userDetails.getEmpId());
            if(addresses.isPresent()) {
                userDetails.setAddress(addresses.get());
            }
            return userDetails;
        }else{
            throw new EntityNotFoundException("User with email ID = " + email + " not found.");
        }
    }

    @Autowired
    private UserDetailsRepository userDetailsRepo;

    @Autowired
    private AudioRepository audioRepository;
    
    @Override
    public UserDetails editUserDetails(UserDetails userDetails, String email){
        Date date = new Date();
        List<Address> addresses = userDetails.getAddress();
        if(!addresses.isEmpty()) {
            for (Address address: addresses) {
                if(address.getId() != null && addressRepository.findById(address.getId()).isPresent()) {
                    addressRepository.updateAddress(address.getHouseno(), address.getStreet(), address.getLocality(), address.getCity(), address.getState(), address.getCountry(), address.getPin(), address.getId());
                }else{
                    addressRepository.save(address);
                }

            }
        }
        userDetailsRepository.updateProfile(userDetails.getName(), userDetails.getDob(), userDetails.getPhone(), userDetails.getSkills(), userDetails.getDesignation(), userDetails.getAbout(), userDetails.getModifiedBy(), email, date );
        
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
