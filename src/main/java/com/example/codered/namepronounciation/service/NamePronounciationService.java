package com.example.codered.namepronounciation.service;

import com.example.codered.namepronounciation.dbEntity.SpeechPresets;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public interface NamePronounciationService {
    void editPronounciation(String email, byte[] audioBuffer) throws SQLException;
    List<SpeechPresets> getAllVoicePresets();
}
