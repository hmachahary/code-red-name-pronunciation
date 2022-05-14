package com.example.codered.namepronounciation.repository;

import com.example.codered.namepronounciation.dbEntity.AudioTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AudioRepository extends JpaRepository<AudioTable,String> {
    @Query(value = "UPDATE TABLE T_NAME_PRONOUNCIATION SET VOICE_NOTE= ?2 WHERE EMAIL =?1", nativeQuery = true)
    void updateAudio(String email, byte[] voiceNote);

    List<AudioTable> findAll();
}
