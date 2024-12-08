package com.klu.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klu.entity.JobPosting;
import com.klu.repositry.JobPostingRepository;

import java.util.List;

@Service
public class JobPostingManager {

    @Autowired
    private JobPostingRepository jobPostingRepository;

    public String insertData(JobPosting jobPosting) {
        jobPostingRepository.save(jobPosting);
        return "Job posting saved successfully.";
    }

    public List<JobPosting> getAllJobs() {
        return jobPostingRepository.findAll();
    }

    public JobPosting getJobById(Long jobId) {
        return jobPostingRepository.findById(jobId).orElse(null);
    }
}
