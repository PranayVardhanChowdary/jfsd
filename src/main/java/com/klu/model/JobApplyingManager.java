package com.klu.model;

import com.klu.entity.JobApplication;
import com.klu.repositry.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobApplyingManager {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    public boolean applyForJob(String username, Long jobId) {
        try {
            // Check if the user has already applied for the job
            if (jobApplicationRepository.existsByUsernameAndJobId(username, jobId)) {
                return false; // Already applied
            }

            JobApplication application = new JobApplication();
            application.setUsername(username);
            application.setJobId(jobId);
            jobApplicationRepository.save(application);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<Long> getAppliedJobIds(String username) {
        List<JobApplication> applications = jobApplicationRepository.findByUsername(username);
        return applications.stream().map(JobApplication::getJobId).collect(Collectors.toList());
    }
}
