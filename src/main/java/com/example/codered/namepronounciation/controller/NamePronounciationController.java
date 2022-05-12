package com.example.codered.namepronounciation.controller;

import com.example.codered.namepronounciation.dbEntity.TestTable;
import com.example.codered.namepronounciation.repository.TestTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NamePronounciationController {

    @Autowired
    private TestTableRepository repo;

    @PostMapping("/save")
    public ResponseEntity<TestTable> saveProfile(@RequestBody TestTable testTable){
        return ResponseEntity.ok(repo.save(testTable));
    }

    @GetMapping("/fetch/all")
    public List<TestTable> fetchAll(){
        return repo.findAll();
    }
}
