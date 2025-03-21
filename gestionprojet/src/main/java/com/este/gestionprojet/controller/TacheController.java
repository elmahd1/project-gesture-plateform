package com.este.gestionprojet.controller;

import com.este.gestionprojet.model.entity.Tache;
import com.este.gestionprojet.service.TacheService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/taches")
public class TacheController {

    @Autowired
    private TacheService tacheService;

    // GET: Fetch all taches
    @GetMapping
    public ResponseEntity<List<Tache>> getAllTaches() {
        List<Tache> taches = tacheService.findAll();
        return ResponseEntity.ok(taches);
    }

    // GET: Fetch a single tache by ID
    @GetMapping("/{id}")
    public ResponseEntity<Tache> getTacheById(@PathVariable int id) {
        Optional<Tache> tache = tacheService.findById(id);
        return tache.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // POST: Create a new tache
    @PostMapping
    public ResponseEntity<Tache> createTache(@RequestBody Tache tache) {
        Tache savedTache = tacheService.save(tache);
        return ResponseEntity.ok(savedTache);
    }

    // PUT: Update an existing tache
    @PutMapping("/{id}")
    public ResponseEntity<Tache> updateTache(@PathVariable int id, @RequestBody Tache tacheDetails) {
        Optional<Tache> tache = tacheService.findById(id);
        if (tache.isPresent()) {
            Tache existingTache = tache.get();
            existingTache.setTitre(tacheDetails.getTitre());
            existingTache.setDescription(tacheDetails.getDescription());
            existingTache.setDateDebut(tacheDetails.getDateDebut());
            existingTache.setDateFin(tacheDetails.getDateFin());
            existingTache.setPriorite(tacheDetails.getPriorite());
            existingTache.setStatut(tacheDetails.getStatut());
            Tache updatedTache = tacheService.save(existingTache);
            return ResponseEntity.ok(updatedTache);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE: Delete a tache by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTache(@PathVariable int id) {
        if (tacheService.findById(id).isPresent()) {
            tacheService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}