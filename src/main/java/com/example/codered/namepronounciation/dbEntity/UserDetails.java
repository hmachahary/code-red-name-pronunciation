package com.example.codered.namepronounciation.dbEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Blob;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "T_USER_DETAILS")
public class UserDetails {
    @Column(name = "EMP_Id")
    private String empId;
    @Column(name = "NAME")
    private String name;
    @Id
    @Column(name = "EMAIL")
    private String email;
    @Column(name = "COUNTRY")
    private String country;
    @Column(name = "OFFICE_ADDRESS")
    private String officeAddress;
    @Column(name = "RESEDENTIAL_ADDRESS")
    private String resedentialAddress;
    @Column(name = "VOICE_NOTE")
    private Blob voiceNote;
    @Column(name = "PHONE")
    private String phone;
    @Column(name = "SKILLS")
    private String skills;
    @Column(name = "DOB")
    private Date dob;
    @Column(name = "DESIGNATION")
    private String designation;

    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getOfficeAddress() {
        return officeAddress;
    }

    public void setOfficeAddress(String officeAddress) {
        this.officeAddress = officeAddress;
    }

    public String getResedentialAddress() {
        return resedentialAddress;
    }

    public void setResedentialAddress(String resedentialAddress) {
        this.resedentialAddress = resedentialAddress;
    }

    public Blob getVoiceNote() {
        return voiceNote;
    }

    public void setVoiceNote(Blob voiceNote) {
        this.voiceNote = voiceNote;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

}