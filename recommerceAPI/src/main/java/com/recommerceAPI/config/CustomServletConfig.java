package com.recommerceAPI.config;

import com.recommerceAPI.controller.formatter.LocalDateTimeFormatter;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class CustomServletConfig implements WebMvcConfigurer {

    @Override
    public void addFormatters(FormatterRegistry registry) {

        registry.addFormatter(new LocalDateTimeFormatter());
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("HEAD", "GET", "POST", "PUT", "DELETE", "OPTIONS")
                .maxAge(300)
                .allowedHeaders("Authorization", "Cache-Control", "Content-Type");
    }
}
