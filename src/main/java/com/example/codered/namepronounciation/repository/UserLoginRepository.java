package com.example.codered.namepronounciation.repository;

import com.example.codered.namepronounciation.dbEntity.UserLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLoginRepository extends JpaRepository<UserLogin, String> {
}
