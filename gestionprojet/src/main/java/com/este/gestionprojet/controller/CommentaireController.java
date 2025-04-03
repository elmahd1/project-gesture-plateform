package com.este.gestionprojet.controller;

import com.este.gestionprojet.model.entity.Commentaire;
import com.este.gestionprojet.service.CommentaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/commentaires")
@CrossOrigin(origins = "http://localhost:4200")
public class CommentaireController {

    @Autowired
    private CommentaireService commentaireService;

    // GET: Fetch all commentaires
    @GetMapping
    public ResponseEntity<List<Commentaire>> getAllCommentaires() {
        List<Commentaire> commentaires = commentaireService.findAll();
        return ResponseEntity.ok(commentaires);
    }

    // GET: Fetch a single commentaire by ID
    @GetMapping("/{id}")
    public ResponseEntity<Commentaire> getCommentaireById(@PathVariable int id) {
        Optional<Commentaire> commentaire = commentaireService.findById(id);
        return commentaire.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // POST: Create a new commentaire
    @PostMapping
    public ResponseEntity<Commentaire> createCommentaire(@RequestBody Commentaire commentaire) {
        Commentaire savedCommentaire = commentaireService.save(commentaire);
        return ResponseEntity.ok(savedCommentaire);
    }

    // PUT: Update an existing commentaire
    @PutMapping("/{id}")
    public ResponseEntity<Commentaire> updateCommentaire(@PathVariable int id, @RequestBody Commentaire commentaireDetails) {
        Optional<Commentaire> commentaire = commentaireService.findById(id);
        if (commentaire.isPresent()) {
            Commentaire existingCommentaire = commentaire.get();
            existingCommentaire.setContenu(commentaireDetails.getContenu());
            existingCommentaire.setDateCreation(commentaireDetails.getDateCreation());
            existingCommentaire.setAuteur(commentaireDetails.getAuteur());
            existingCommentaire.setTache(commentaireDetails.getTache());
            Commentaire updatedCommentaire = commentaireService.save(existingCommentaire);
            return ResponseEntity.ok(updatedCommentaire);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE: Delete a commentaire by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommentaire(@PathVariable int id) {
        if (commentaireService.findById(id).isPresent()) {
            commentaireService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}