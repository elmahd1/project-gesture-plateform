package com.este.gestionprojet.repository;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.este.gestionprojet.model.entity.Document;

@Repository
public interface DocumentRepo extends JpaRepository<Document, Integer> {

    List<Document> findByProjetId(int projetId);

    List<Document> findByCreateurId(int createurId);
    
}
