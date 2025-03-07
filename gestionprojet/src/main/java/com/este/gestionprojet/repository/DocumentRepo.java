package com.este.gestionprojet.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.este.gestionprojet.model.entity.Document;

@Repository
public interface DocumentRepo extends JpaRepository<Document, Integer> {
    
}
