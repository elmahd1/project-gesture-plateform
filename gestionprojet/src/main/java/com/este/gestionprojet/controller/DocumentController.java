package com.este.gestionprojet.controller;

import com.este.gestionprojet.model.entity.Document;
import com.este.gestionprojet.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    // GET: Fetch all documents
    @GetMapping
    public ResponseEntity<List<Document>> getAllDocuments() {
        List<Document> documents = documentService.findAll();
        return ResponseEntity.ok(documents);
    }

    // GET: Fetch a single document by ID
    @GetMapping("/{id}")
    public ResponseEntity<Document> getDocumentById(@PathVariable int id) {
        Optional<Document> document = documentService.findById(id);
        return document.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // POST: Create a new document
    @PostMapping
    public ResponseEntity<Document> createDocument(@RequestBody Document document) {
        Document savedDocument = documentService.save(document);
        return ResponseEntity.ok(savedDocument);
    }

    // PUT: Update an existing document
    @PutMapping("/{id}")
    public ResponseEntity<Document> updateDocument(@PathVariable int id, @RequestBody Document documentDetails) {
        Optional<Document> document = documentService.findById(id);
        if (document.isPresent()) {
            Document existingDocument = document.get();
            existingDocument.setNom(documentDetails.getNom());
            existingDocument.setCheminFichier(documentDetails.getCheminFichier());
            existingDocument.setDateCreation(documentDetails.getDateCreation());
            existingDocument.setDateDerniereModification(documentDetails.getDateDerniereModification());
            existingDocument.setCreateur(documentDetails.getCreateur());
            existingDocument.setType(documentDetails.getType());
            Document updatedDocument = documentService.save(existingDocument);
            return ResponseEntity.ok(updatedDocument);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE: Delete a document by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable int id) {
        if (documentService.findById(id).isPresent()) {
            documentService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST: Download a document
    @PostMapping("/{id}/telecharger")
    public ResponseEntity<String> telechargerDocument(@PathVariable int id) {
        Optional<Document> document = documentService.findById(id);
        if (document.isPresent()) {
            document.get().telecharger();
            return ResponseEntity.ok("Document téléchargé avec succès.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST: Share a document with a user
    @PostMapping("/{id}/partager")
    public ResponseEntity<String> partagerDocument(@PathVariable int id, @RequestParam int utilisateurId) {
        Optional<Document> document = documentService.findById(id);
        if (document.isPresent()) {
             Utilisateur utilisateur = utilisateurService.findById(utilisateurId).orElse(null);
             document.get().partager(utilisateur);
            return ResponseEntity.ok("Document partagé avec succès.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
