package com.example.codered.namepronounciation.dbEntity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="LoginInfo")
public class UserLogin {
    @Id
    private String email;
    private String password;
    private boolean isAdmin;
    private boolean isOptedOut;
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

    public boolean isOptedOut() {
        return isOptedOut;
    }

    public void setOptedOut(boolean optedOut) {
        isOptedOut = optedOut;
    }
}
