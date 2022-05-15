package com.example.codered.namepronounciation.repository;

import com.example.codered.namepronounciation.dbEntity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Optional<List<Address>> findAllByEmpid(String empId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE T_ADDRESSES SET HOUSE_NO = ?1, STREET = ?2, LOCALITY = ?3, CITY = ?4, STATE = ?5, COUNTRY = ?6, PIN = ?7 WHERE ID = ?8", nativeQuery = true)
    void updateAddress(String houseNo, String street, String locality, String city, String state, String country, String pin, Long ID);
}
