package com.example.codered.namepronounciation.controller;

import com.example.codered.namepronounciation.dbEntity.UserDetails;
import com.example.codered.namepronounciation.service.UserService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Date;


@ExtendWith(MockitoExtension.class)
public class UsersControllerTest {

    @InjectMocks
    private UsersController usersController;

    @Mock
    private UserService userService;



//    @Before
//    public void setup() {
//        MockitoAnnotations.openMocks(this);
//    }

    public UserDetails buildUserDetails() {
        UserDetails userDetails = new UserDetails();
        userDetails.setAbout("test");
        userDetails.setEmail("Test.A@w.com");
        userDetails.setDesignation("test");
        userDetails.setGender("M");
        userDetails.setCreatedAt(new Date());
        userDetails.setEmpId("123");
        return userDetails;
    }

    @Test
    public void getUserDetails() {
        UserDetails userDetails = buildUserDetails();
        Mockito.when(userService.getUserDetails("Test.A@w.com")).thenReturn(userDetails);
       // Mockito.when(userDetailsRepository.findByEmailIgnoreCase("TEST")).thenReturn(java.util.Optional.ofNullable(userDetails));
        Assert.assertEquals(ResponseEntity.ok(userDetails),usersController.getUserDetails("Test.A@w.com"));
    }

    @Test
    public void editUserDetails() {
        UserDetails userDetails = buildUserDetails();
        Mockito.when(userService.editUserDetails(userDetails,"Test.A@w.com")).thenReturn(userDetails);
        Assert.assertEquals(ResponseEntity.ok(userDetails),usersController.editUserDetails("Test.A@w.com",userDetails));
    }
}