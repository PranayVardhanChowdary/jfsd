package com.klu.repositry;

import com.klu.entity.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobApplyingRepository extends JpaRepository<JobPosting, Long> {
}
