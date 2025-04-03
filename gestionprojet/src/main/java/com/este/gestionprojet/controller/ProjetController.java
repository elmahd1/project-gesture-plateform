package com.este.gestionprojet.controller;

import com.este.gestionprojet.model.entity.Projet;
import com.este.gestionprojet.service.ProjetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjetController {

    @Autowired
    private ProjetService projetService;

    // Récupérer tous les projets
    @GetMapping
    public ResponseEntity<List<Projet>> getAllProjets() {
        List<Projet> projets = projetService.findAll();
        return ResponseEntity.ok(projets);
    }

    // Récupérer un projet par ID
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Projet>> getProjetById(@PathVariable int id) {
        Optional<Projet> projet = projetService.findById(id);
        return ResponseEntity.ok(projet);
    }

    // Créer un nouveau projet
    @PostMapping
    public ResponseEntity<Projet> createProjet(@RequestBody Projet projet) {
        Projet createdProjet = projetService.save(projet);
        return ResponseEntity.ok(createdProjet);
    }

    // Mettre à jour un projet
    @PutMapping("/{id}")
    public ResponseEntity<Projet> updateProjet(@PathVariable int id, @RequestBody Projet projet) {
        Projet updatedProjet = projetService.update(id, projet);
        return ResponseEntity.ok(updatedProjet);
    }

    // Supprimer un projet
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProjet(@PathVariable int id) {
        projetService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}