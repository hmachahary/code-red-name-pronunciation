package com.example.codered.namepronounciation.dbEntity;

import java.util.List;

public class AllEmployee {
    private List<UserDetails> userDetails;
    private List<AudioTable> audioTable;

    public List<UserDetails> getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(List<UserDetails> userDetails) {
        this.userDetails = userDetails;
    }

    public List<AudioTable> getAudioTable() {
        return audioTable;
    }

    public void setAudioTable(List<AudioTable> audioTable) {
        this.audioTable = audioTable;
    }
}
