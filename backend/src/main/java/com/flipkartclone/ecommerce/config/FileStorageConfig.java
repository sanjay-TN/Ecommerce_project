package com.flipkartclone.ecommerce.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Configuration
public class FileStorageConfig {

    @Value("${app.upload-dir}")
    private String uploadDir;

    @PostConstruct
    public void init() throws IOException {
        Files.createDirectories(Path.of(uploadDir));
    }
}
