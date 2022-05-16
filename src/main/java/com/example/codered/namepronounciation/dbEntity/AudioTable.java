package com.example.codered.namepronounciation.dbEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "T_NAMES_PRONOUNCIATION")
public class AudioTable {
    @Id
    @Column(name="EMAIL")
    private String email;
    @Column(name = "VOICE_NOTE")
    private byte[] voiceNote;
    @Column(name = "REGION")
    private String region;
    @Column(name = "VOICE_TYPE")
    private String voiceType;
    @Column(name = "VOICE_GENDER")
    private String voiceGender;
    @Column(name = "PREFERENCE")
    private String preference;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public byte[] getVoiceNote() {
        return voiceNote;
    }

    public void setVoiceNote(byte[] voiceNote) {
        this.voiceNote = voiceNote;
    }

    public String getPreference() {
        return preference;
    }

    public void setPreference(String preference) {
        this.preference = preference;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getVoiceType() {
        return voiceType;
    }

    public void setVoiceType(String voiceType) {
        this.voiceType = voiceType;
    }

    public String getVoiceGender() {
        return voiceGender;
    }

    public void setVoiceGender(String voiceGender) {
        this.voiceGender = voiceGender;
    }
}
