package com.example.codered.namepronounciation.dbEntity;

import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="T_USERS")
public class Users {
    @Id
    @Email
    @NotBlank(message = "Email is required")
    private String email;
    @UniqueElements
    @NotBlank(message = "Employee ID is required")
    private String empID;
    @NotBlank(message = "Password is required")
    private String password;
    @NotNull(message = "Admin flag is required")
    private boolean isAdmin;

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
}
