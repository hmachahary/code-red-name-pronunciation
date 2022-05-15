package com.example.codered.namepronounciation.repository;

import com.example.codered.namepronounciation.dbEntity.SpeechPresets;
import org.springframework.data.repository.CrudRepository;

public interface SpeechPresetsRepository extends CrudRepository<SpeechPresets, Long> {
}
