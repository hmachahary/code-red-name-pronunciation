package com.example.codered.namepronounciation.service;

import org.springframework.stereotype.Service;

import java.sql.SQLException;

@Service
public interface NamePronounciationService {
    void editPronounciation(String email, byte[] audioBuffer) throws SQLException;
}
