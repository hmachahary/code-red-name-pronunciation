package com.example.codered.namepronounciation.dbEntity;

import javax.persistence.Id;

import javax.persistence.*;

@Entity
@Table(name = "TEST_TABLE")
public class TestTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String uid;
    @Column(name="NAME")
    private String name;
    @Column(name="AGE")
    private int age;
    @Column(name="EMAIL")
    private String email;
//    @Column(name="AUDIO_FILE")
//    private Blob audioFile;
    @Column(name="GENDER")
    private String gender;

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
