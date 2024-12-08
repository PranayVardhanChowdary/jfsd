package com.klu.repositry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klu.entity.Captcha;

@Repository
public interface CaptchaRepository extends JpaRepository<Captcha, Long> {
	                                                     // entity class and data type of primary key
	
	
	

}
