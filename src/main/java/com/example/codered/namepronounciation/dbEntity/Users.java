package com.example.codered.namepronounciation.dbEntity;

import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="T_USERS")
public class Users {
    @Id
    @Column(name = "empid")
    @NotBlank(message = "Employee ID is required")
    private String empID;

    @Email
    @Column(name = "email")
    @NotBlank(message = "Email is required")
    private String email;

    @Column(name = "password")
    @NotBlank(message = "Password is required")
    private String password;

    @Column(name = "is_Admin")
    @NotNull(message = "Admin flag is required")
    private boolean isAdmin;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "emp_id")
    private UserDetails userDetails;

    public String getEmpID() {return empID;}

    public void setEmpID(String empID) {this.empID = empID;}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public UserDetails getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(UserDetails userDetails) {
        this.userDetails = userDetails;
    }
}
