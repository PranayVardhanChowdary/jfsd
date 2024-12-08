package com.klu.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klu.model.CaptchaManager;

@RestController
@RequestMapping("/captcha")
public class CaptchaController {

    @Autowired
    private CaptchaManager captchaManager;

    @GetMapping("/getcaptcha/{length}")
    public ResponseEntity<Map<String, String>> getCaptcha(@PathVariable int length) {
        // Generate CAPTCHA
        String captcha = captchaManager.generateCaptcha(length);
        Map<String, String> response = new HashMap<>();
        response.put("captcha", captcha);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/validate/{captchaText}")
    public ResponseEntity<Map<String, String>> validateCaptcha(@PathVariable String captchaText) {
        // Validate CAPTCHA
        boolean isValid = captchaManager.validateCaptcha(captchaText);
        Map<String, String> response = new HashMap<>();
        response.put("validationResult", isValid ? "Validation Success" : "Validation Failed");
        return ResponseEntity.ok(response);
    }
}