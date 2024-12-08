package com.klu.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "person")
public class Person {
  @Id
  String username;
  String email;
  String registerAs;
  String password;
  String resumeFilename;
  String resumeStatus;

  // Getters and setters for all fields
  public String getRegisterAs() {
    return registerAs;
  }
  public void setRegisterAs(String registerAs) {
    this.registerAs = registerAs;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getUsername() {
    return username;
  }
  public void setUsername(String username) {
    this.username = username;
  }
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }
  public String getResumeFilename() {
    return resumeFilename;
  }
  public void setResumeFilename(String resumeFilename) {
    this.resumeFilename = resumeFilename;
  }
  public String getResumeStatus() {
    return resumeStatus;
  }
  public void setResumeStatus(String resumeStatus) {
    this.resumeStatus = resumeStatus;
  }
}