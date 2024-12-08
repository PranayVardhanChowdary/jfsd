package com.klu.repositry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klu.entity.Person;

@Repository
public interface PersonRepositry  extends JpaRepository<Person, String>{
	
	 Person findByUsername(String username);

	Person findByEmail(String email);

	long countByRegisterAs(String string);

}
