package com.example.codered.namepronounciation.repository;

import com.example.codered.namepronounciation.dbEntity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepository extends JpaRepository<UserDetails,String> {

}
