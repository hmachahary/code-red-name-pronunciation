package com.example.codered.namepronounciation.model;

import lombok.Data;

@Data
public class LoginResponse {
    private String email;
    private boolean isAdmin;
}
