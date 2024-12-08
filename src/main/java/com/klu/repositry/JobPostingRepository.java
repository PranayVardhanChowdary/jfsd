package com.klu.repositry;

import org.springframework.data.jpa.repository.JpaRepository;
import com.klu.entity.JobPosting;

public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {
}
