package com.klu.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klu.entity.Person;
import com.klu.repositry.PersonRepositry;

import java.util.List;

@Service
public class PersonManager {

    @Autowired
    private PersonRepositry personRepository;

    public List<Person> getAllPersons() {
        return personRepository.findAll();
    }

    public Person findByUsername(String username) {
        return personRepository.findByUsername(username);
    }

    public Person findByEmail(String email) {
        return personRepository.findByEmail(email);
    }

    public String Registration(Person person) {
        personRepository.save(person);
        return "Registration successful";
    }
}
