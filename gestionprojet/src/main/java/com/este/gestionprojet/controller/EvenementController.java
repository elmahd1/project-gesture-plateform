package com.este.gestionprojet.controller;

import com.este.gestionprojet.model.entity.Evenement;
import com.este.gestionprojet.model.entity.Utilisateur;
import com.este.gestionprojet.service.EvenementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/evenements")
@CrossOrigin(origins = "http://localhost:4200")
public class EvenementController {

    @Autowired
    private EvenementService evenementService;

    // GET: Fetch all evenements
    @GetMapping
    public ResponseEntity<List<Evenement>> getAllEvenements() {
        List<Evenement> evenements = evenementService.findAll();
        return ResponseEntity.ok(evenements);
    }

    // GET: Fetch a single evenement by ID
    @GetMapping("/{id}")
    public ResponseEntity<Evenement> getEvenementById(@PathVariable int id) {
        Optional<Evenement> evenement = evenementService.findById(id);
        return evenement.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // POST: Create a new evenement
    @PostMapping
    public ResponseEntity<Evenement> createEvenement(@RequestBody Evenement evenement) {
        Evenement savedEvenement = evenementService.save(evenement);
        return ResponseEntity.ok(savedEvenement);
    }

    // PUT: Update an existing evenement
    @PutMapping("/{id}")
    public ResponseEntity<Evenement> updateEvenement(@PathVariable int id, @RequestBody Evenement evenementDetails) {
        Optional<Evenement> evenement = evenementService.findById(id);
        if (evenement.isPresent()) {
            Evenement existingEvenement = evenement.get();
            existingEvenement.setTitre(evenementDetails.getTitre());
            existingEvenement.setDescription(evenementDetails.getDescription());
            existingEvenement.setDateDebut(evenementDetails.getDateDebut());
            existingEvenement.setDateFin(evenementDetails.getDateFin());
            existingEvenement.setParticipants(evenementDetails.getParticipants());
            existingEvenement.setType(evenementDetails.getType());
            Evenement updatedEvenement = evenementService.save(existingEvenement);
            return ResponseEntity.ok(updatedEvenement);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE: Delete an evenement by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvenement(@PathVariable int id) {
        if (evenementService.findById(id).isPresent()) {
            evenementService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST: Add a participant to an evenement
    @PostMapping("/{id}/ajouter-participant")
    public ResponseEntity<String> ajouterParticipant(@PathVariable int id, @RequestBody Utilisateur participant) {
        Optional<Evenement> evenement = evenementService.findById(id);
        if (evenement.isPresent()) {
            evenementService.ajouterParticipant(id, participant);
            return ResponseEntity.ok("Participant ajouté avec succès.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST: Notify participants of an evenement
    @PostMapping("/{id}/notifier-participants")
    public ResponseEntity<String> notifierParticipants(@PathVariable int id) {
        Optional<Evenement> evenement = evenementService.findById(id);
        if (evenement.isPresent()) {
            evenementService.notifierParticipants(id);
            return ResponseEntity.ok("Participants notifiés avec succès.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}