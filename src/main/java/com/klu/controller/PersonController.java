package com.klu.controller;

import com.klu.entity.Person;
import com.klu.model.PersonManager;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/person")
public class PersonController {

    @Autowired
    PersonManager PM;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody Person pu) {
        // Check if the username already exists
        Person existingUser = PM.findByUsername(pu.getUsername());
        // Check if the email already exists
        Person existingEmail = PM.findByEmail(pu.getEmail());

        Map<String, String> response = new HashMap<>();
        if (existingUser != null) {
            response.put("status", "error");
            response.put("message", "Username already exists");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        } else if (existingEmail != null) {
            response.put("status", "error");
            response.put("message", "Email is already taken");
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        } else {
            // Proceed with registration if neither the username nor email exists
            String registrationResult = PM.Registration(pu);
            response.put("status", "success");
            response.put("message", registrationResult);
            return ResponseEntity.ok(response);
        }
    }

    @Autowired
    private HttpSession httpSession;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Person loginUser) {
        Person foundPerson = PM.findByUsername(loginUser.getUsername());
        Map<String, String> response = new HashMap<>();
        if (foundPerson != null && foundPerson.getPassword().equals(loginUser.getPassword())) {
            // Store user details in the session
            httpSession.setAttribute("loggedInUser", foundPerson);
            response.put("status", "success");
            response.put("username", foundPerson.getUsername());
            response.put("email", foundPerson.getEmail());
            response.put("registerAs", foundPerson.getRegisterAs());
            response.put("message", "Successfully logged in");
            return ResponseEntity.ok(response);
        } else {
            response.put("status", "error");
            response.put("message", "Invalid username or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @GetMapping("/all")
    public List<Person> getAllPersons() {
        return PM.getAllPersons();
    }
}