package com.este.gestionprojet.controller;

import com.este.gestionprojet.model.entity.Utilisateur;
import com.este.gestionprojet.model.entity.Tache;
import com.este.gestionprojet.service.UtilisateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    @Autowired
    private UtilisateurService utilisateurService;

    @GetMapping
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Utilisateur> getUtilisateurById(@PathVariable Long id) {
        Optional<Utilisateur> utilisateur = utilisateurService.findById(id);
        return utilisateur.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Utilisateur createUtilisateur(@RequestBody Utilisateur utilisateur) {
        return utilisateurService.save(utilisateur);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Utilisateur> updateUtilisateur(@PathVariable Long id, @RequestBody Utilisateur utilisateurDetails) {
        Optional<Utilisateur> utilisateur = utilisateurService.findById(id);
        if (utilisateur.isPresent()) {
            Utilisateur updatedUtilisateur = utilisateur.get();
            updatedUtilisateur.setNom(utilisateurDetails.getNom());
            updatedUtilisateur.setPrenom(utilisateurDetails.getPrenom());
            updatedUtilisateur.setEmail(utilisateurDetails.getEmail());
            updatedUtilisateur.setMotDePasse(utilisateurDetails.getMotDePasse());
            updatedUtilisateur.setRole(utilisateurDetails.getRole());
            utilisateurService.save(updatedUtilisateur);
            return ResponseEntity.ok(updatedUtilisateur);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        Optional<Utilisateur> utilisateur = utilisateurService.findById(id);
        if (utilisateur.isPresent()) {
            utilisateurService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/assigner-tache")
    public ResponseEntity<Void> assignerTache(@PathVariable Long id, @RequestBody Tache tache) {
        utilisateurService.assignerTache(id, tache);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/creer-commentaire")
    public ResponseEntity<Void> creerCommentaire(@PathVariable Long id, @RequestBody Tache tache, @RequestParam String commentaire) {
        utilisateurService.creerCommentaire(id, tache, commentaire);
        return ResponseEntity.ok().build();
    }
}