package com.example.codered.namepronounciation.repository;

import com.example.codered.namepronounciation.dbEntity.TestTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestTableRepository extends JpaRepository<TestTable, Long> {
}
