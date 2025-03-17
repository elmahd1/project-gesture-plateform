package com.este.gestionprojet.service;

import com.este.gestionprojet.model.entity.Document;
import com.este.gestionprojet.repository.DocumentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepo documentRepository;

    public List<Document> findAll() {
        return documentRepository.findAll();
    }

    public Optional<Document> findById(int id) {
        return documentRepository.findById(id);
    }

    public Document save(Document document) {
        return documentRepository.save(document);
    }

    public void deleteById(int id) {
        documentRepository.deleteById(id);
    }

    public List<Document> findByProjetId(int projetId) {
        return documentRepository.findByProjetId(projetId);
    }

    public List<Document> findByCreateurId(int createurId) {
        return documentRepository.findByCreateurId(createurId);
    }
}