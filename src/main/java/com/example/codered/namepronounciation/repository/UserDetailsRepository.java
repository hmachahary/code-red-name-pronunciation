package com.example.codered.namepronounciation.repository;

import com.example.codered.namepronounciation.dbEntity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.Optional;

@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetails,String> {

    @Modifying
    @Transactional
    @Query(value = "UPDATE T_USER_DETAILS SET  NAME = ?1, DOJ =?2, PHONE =?3, SKILLS=?4, DESIGNATION =?5, ABOUT =?6, MODIFIED_BY =?7, MODIFIED_TS =?9 WHERE EMAIL = ?8", nativeQuery = true)
    void updateProfile(String name, Date dob, String phone, String skills, String designation, String about, Date modifiedBy, String email, Date modifiedAt);

    Optional<UserDetails> findByEmailIgnoreCase(String email);

}
