package com.example.codered.namepronounciation.model;

import com.example.codered.namepronounciation.dbEntity.AudioTable;
import com.example.codered.namepronounciation.dbEntity.UserDetails;

public class UserDetailsResponseModel {
    private UserDetails userDetails;
    private AudioTable audioTable;

    public UserDetails getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(UserDetails userDetails) {
        this.userDetails = userDetails;
    }

    public AudioTable getAudioTable() {
        return audioTable;
    }

    public void setAudioTable(AudioTable audioTable) {
        this.audioTable = audioTable;
    }
}
