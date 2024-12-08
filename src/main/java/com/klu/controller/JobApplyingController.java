package com.klu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import com.klu.entity.JobPosting;
import com.klu.model.JobPostingManager;

@RestController
@RequestMapping("/jobs")
public class JobApplyingController {

    @Autowired
    JobPostingManager jobPostingManager;
}
