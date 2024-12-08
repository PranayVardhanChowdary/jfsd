package com.klu.model;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileUploadService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public void uploadFile(MultipartFile file) throws IOException {
        // Ensure the directory exists
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Define the file path where the file will be stored
        Path filePath = uploadPath.resolve(file.getOriginalFilename());

        // Save the file to the specified path
        file.transferTo(filePath.toFile());
    }
}
