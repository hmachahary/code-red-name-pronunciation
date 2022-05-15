package com.example.codered.namepronounciation.dbEntity;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "T_USER_DETAILS")
public class UserDetails {
    @Id
    @Column(name = "emp_id")
    private String empId;

    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column(name = "skills")
    private String skills;
    @Column(name = "doj")
    private Date doj;
    @Column(name = "about")
    private String about;
    @Column(name = "gender")
    private String gender;
    @Column(name = "designation")
    private String designation;
    @Column(name = "country")
    private String country;
    @Column(name = "office_address")
    private String officeAddress;
    @Column(name = "resedential_address")
    private String resedentialAddress;
    @Column(name = "opt_out")
    private Boolean optOut;
    @Column(name= "CREATED_TS")
    private Date createdAt;
    @Column(name= "MODIFIED_TS")
    private Date modifiedAt;
    @Column(name= "MODIFIED_BY")
    private Date modifiedBy;

    @OneToOne(mappedBy = "userDetails")
    private Users users;

    @OneToOne
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "email",
            referencedColumnName = "email",
            insertable = false, updatable = false,
            foreignKey = @javax.persistence
                    .ForeignKey(value = ConstraintMode.NO_CONSTRAINT))
    private AudioTable audioTable;

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
        return doj;
    }

    public void setDob(Date doj) {
        this.doj = doj;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(Date modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

    public Date getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(Date modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public AudioTable getAudioTable() {
        return audioTable;
    }

    public void setAudioTable(AudioTable audioTable) {
        this.audioTable = audioTable;
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

    public Boolean getOptOut() {
        return optOut;
    }

    public void setOptOut(Boolean optOut) {
        this.optOut = optOut;
    }
}
