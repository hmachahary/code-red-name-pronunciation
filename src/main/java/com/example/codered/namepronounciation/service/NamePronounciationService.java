package com.example.codered.namepronounciation.service;

import com.example.codered.namepronounciation.dbEntity.SpeechPresets;
import com.example.codered.namepronounciation.model.Voices;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public interface NamePronounciationService {
    void editPronounciation(String email, byte[] audioBuffer, String region, String voiceType, String voiceGender, String preference) throws SQLException;
    List<SpeechPresets> getAllVoicePresets();
    List<Voices> getVoicesByRegion(String region);
}
