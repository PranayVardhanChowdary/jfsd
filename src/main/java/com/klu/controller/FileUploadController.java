package com.klu.controller;

import com.klu.entity.Person;
import com.klu.repositry.PersonRepositry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    @Autowired
    private PersonRepositry personRepository;

    // Upload file
    @PostMapping("/upload")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam("username") String username) {
        Person person = personRepository.findById(username).orElse(null);
        if (person == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("status", "error", "message", "User not found"));
        }

        if ("yes".equals(person.getResumeStatus())) {
            return ResponseEntity.ok().body(Map.of("status", "yes", "message", "Already uploaded"));
        }

        // Save the file to the server (implementation not shown)
        String filename = file.getOriginalFilename();
        // Update the person entity
        person.setResumeFilename(filename);
        person.setResumeStatus("yes");
        personRepository.save(person);

        return ResponseEntity.ok().body(Map.of("status", "success", "message", "File uploaded successfully"));
    }
}