package com.example.codered.namepronounciation.service.impl;

import com.example.codered.namepronounciation.dbEntity.AudioTable;
import com.example.codered.namepronounciation.repository.AudioRepository;
import com.example.codered.namepronounciation.service.NamePronounciationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.sql.SQLException;
import java.util.Optional;

@Service
public class NamePronounciationServiceImpl implements NamePronounciationService {

    @Autowired
    private AudioRepository audioRepository;

    @Override
    public void editPronounciation(String email, byte[] audioBuffer) throws SQLException {

        Optional<AudioTable> audioDetails = audioRepository.findById(email);
        if(audioDetails.isPresent())
            audioRepository.updateAudio(email,audioBuffer);
        else {
            AudioTable audioTable = new AudioTable();
            audioTable.setEmail(email);
            audioTable.setVoiceNote(audioBuffer);
            audioRepository.save(audioTable);
        }

    }
}
