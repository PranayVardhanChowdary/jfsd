package com.klu.repositry;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klu.entity.FileDB;



@Repository
public interface FileDBRepository extends JpaRepository<FileDB, String> {

	Optional<FileDB> findById(String id);

}