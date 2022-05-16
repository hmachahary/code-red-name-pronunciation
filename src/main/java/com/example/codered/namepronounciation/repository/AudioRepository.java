package com.example.codered.namepronounciation.repository;

import com.example.codered.namepronounciation.dbEntity.AudioTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface AudioRepository extends JpaRepository<AudioTable,String> {
    @Modifying
    @Transactional
    @Query(value = "UPDATE T_NAMES_PRONOUNCIATION SET VOICE_NOTE= ?2, REGION = ?3, VOICE_GENDER = ?5, VOICE_TYPE = ?4, PREFERENCE = ?6 WHERE EMAIL =?1", nativeQuery = true)
    void updateAudio(String email, byte[] voiceNote, String region, String voiceType, String voiceGender, String preference);

    List<AudioTable> findAll();
}
