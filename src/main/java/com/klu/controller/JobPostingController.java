package com.klu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.klu.entity.JobPosting;
import com.klu.model.JobApplyingManager;
import com.klu.model.JobPostingManager;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/jobs")
public class JobPostingController {

    @Autowired
    JobPostingManager M;

    @Autowired
    JobApplyingManager jobApplicationManager;

    @PostMapping("/apply")
    public ResponseEntity<String> applyForJob(@RequestBody Map<String, String> applicationData) {
        String username = applicationData.get("username");
        Long jobId = Long.parseLong(applicationData.get("jobId"));

        // Logic to handle job application
        boolean success = jobApplicationManager.applyForJob(username, jobId);

        if (success) {
            return ResponseEntity.ok("Application successful");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Already applied");
        }
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveJob(@RequestBody JobPosting jobPosting) {
        M.insertData(jobPosting);
        return ResponseEntity.ok("Job posting saved successfully.");
    }

    @GetMapping("/all")
    public List<JobPosting> getAllJobs() {
        return M.getAllJobs();
    }

    @GetMapping("/applied/{username}")
    public List<Long> getAppliedJobs(@PathVariable String username) {
        return jobApplicationManager.getAppliedJobIds(username);
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<JobPosting> getJobById(@PathVariable Long jobId) {
        JobPosting jobPosting = M.getJobById(jobId);
        if (jobPosting != null) {
            return ResponseEntity.ok(jobPosting);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    private List<JobPosting> createRandomJobPostings(int count) {
        List<JobPosting> jobPostings = new ArrayList<>();
        Random random = new Random();
        String[] jobTitles = {"Software Engineer", "Data Scientist", "Product Manager", "UX Designer", "DevOps Engineer"};
        String[] companies = {"TechCorp", "InnovateX", "DataWorks", "DesignHub", "CloudNet"};
        String[] locations = {"New York, NY", "San Francisco, CA", "Austin, TX", "Seattle, WA", "Boston, MA"};

        for (int i = 0; i < count; i++) {
            JobPosting job = new JobPosting();
            job.setTitle(jobTitles[random.nextInt(jobTitles.length)]);
            job.setCompany(companies[random.nextInt(companies.length)]);
            job.setLocation(locations[random.nextInt(locations.length)]);
            job.setDescription("This is a job description for " + job.getTitle() + " at " + job.getCompany() + ".");
            job.setSalary("$" + (random.nextInt(100) + 50) + "k per year");
            jobPostings.add(job);
        }

        return jobPostings;
    }
}
