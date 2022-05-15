package com.example.codered.namepronounciation.model;

public class Voices {
    private String Name;
    private String ShortName;
    private String DisplayName;
    private String Gender;
    private String Locale;
    private String VoiceType;

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getShortName() {
        return ShortName;
    }

    public void setShortName(String shortName) {
        ShortName = shortName;
    }

    public String getDisplayName() {
        return DisplayName;
    }

    public void setDisplayName(String displayName) {
        DisplayName = displayName;
    }

    public String getGender() {
        return Gender;
    }

    public void setGender(String gender) {
        Gender = gender;
    }

    public String getLocale() {
        return Locale;
    }

    public void setLocale(String locale) {
        Locale = locale;
    }

    public String getVoiceType() {
        return VoiceType;
    }

    public void setVoiceType(String voiceType) {
        VoiceType = voiceType;
    }
}
