package com.example.codered.namepronounciation.service.impl;

import com.example.codered.namepronounciation.dbEntity.AudioTable;
import com.example.codered.namepronounciation.dbEntity.SpeechPresets;
import com.example.codered.namepronounciation.model.Voices;
import com.example.codered.namepronounciation.repository.AudioRepository;
import com.example.codered.namepronounciation.repository.SpeechPresetsRepository;
import com.example.codered.namepronounciation.service.NamePronounciationService;
import com.example.codered.namepronounciation.ttsCore.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class NamePronounciationServiceImpl implements NamePronounciationService {

    @Autowired
    private AudioRepository audioRepository;

    @Autowired
    private SpeechPresetsRepository speechPresetsRepository;

    @Override
    public void editPronounciation(String email, byte[] audioBuffer, String region, String voiceType, String voiceGender, String preference) throws SQLException {

        Optional<AudioTable> audioDetails = audioRepository.findById(email);
        if(audioDetails.isPresent())
            audioRepository.updateAudio(email,audioBuffer, region, voiceType, voiceGender, preference);
        else {
            AudioTable audioTable = new AudioTable();
            audioTable.setEmail(email);
            audioTable.setVoiceNote(audioBuffer);
            audioRepository.save(audioTable);
        }

    }

    @Override
    public List<SpeechPresets> getAllVoicePresets() {
        List<SpeechPresets> presetsList = new ArrayList<>();
        Iterable<SpeechPresets> iterable = speechPresetsRepository.findAll();
        iterable.forEach(presetsList::add);
        return presetsList;
    }

    @Override
    public List<Voices> getVoicesByRegion(String region) {
        List<Voices> voices = new ArrayList<>();
//        String token = authentication.GetAccessToken();
        return voices;
    }
}
