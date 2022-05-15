package com.example.codered.namepronounciation.repository;

import com.example.codered.namepronounciation.dbEntity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<Users, String> {
    Optional<Users> findByEmailIgnoreCase(String email);
}
