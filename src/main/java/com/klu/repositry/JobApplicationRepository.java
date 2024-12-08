package com.klu.repositry;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klu.entity.JobApplication;

import java.util.List;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    boolean existsByUsernameAndJobId(String username, Long jobId);
    List<JobApplication> findByUsername(String username);
}
