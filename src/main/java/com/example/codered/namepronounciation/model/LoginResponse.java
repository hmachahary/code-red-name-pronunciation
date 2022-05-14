package com.example.codered.namepronounciation.model;

import lombok.Data;

@Data
public class LoginResponse {
    private String email;
    private boolean isAdmin;
    private boolean isAuthenticated;

    public boolean isAuthenticated() {
        return isAuthenticated;
    }

    public void setAuthenticated(boolean authenticated) {
        isAuthenticated = authenticated;
    }
}
