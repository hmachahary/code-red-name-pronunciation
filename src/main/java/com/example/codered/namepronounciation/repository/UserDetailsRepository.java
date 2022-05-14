package com.example.codered.namepronounciation.repository;

import com.example.codered.namepronounciation.dbEntity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetails,String> {

    @Query(value = "UPDATE T_USER_DETAILS SET  NAME = ?1, DOB =?2, COUNTRY =?3, OFFICE_ADDRESS = ?4, RESEDENTIAL_ADDRESS = ?5, PHONE =?6, SKILLS=?7, DESIGNATION =?8, MODIFIED_BY =?10, MODIFIED_TS =?11 WHERE EMAIL = ?9", nativeQuery = true)
    void updateProfile(String name, Date dob, String country, String officeAddress, String residentialAdress, String phone, String skills, String designation, String email, Date modifiedBy, Date modifiedAt);
}
