package com.este.gestionprojet.service;

import com.este.gestionprojet.model.entity.Projet;
import com.este.gestionprojet.model.entity.Tache;
import com.este.gestionprojet.model.entity.Utilisateur;
import com.este.gestionprojet.repository.ProjetRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjetService {

    @Autowired
    private ProjetRepo projetRepository;

    public List<Projet> findAll() {
        return projetRepository.findAll();
    }

    public Optional<Projet> findById(int id) {
        return projetRepository.findById(id);
    }

    public Projet save(Projet projet) {
        return projetRepository.save(projet);
    }

    public void deleteById(int id) {
        projetRepository.deleteById(id);
    }

    public void ajouterTache(int projetId, Tache tache) {
        Optional<Projet> projetOpt = projetRepository.findById(projetId);
        if (projetOpt.isPresent()) {
            Projet projet = projetOpt.get();
            projet.ajouterTache(tache);
            projetRepository.save(projet);
        }
    }

    public void supprimerTache(int projetId, Tache tache) {
        Optional<Projet> projetOpt = projetRepository.findById(projetId);
        if (projetOpt.isPresent()) {
            Projet projet = projetOpt.get();
            projet.supprimerTache(tache);
            projetRepository.save(projet);
        }
    }

    public void ajouterMembre(int projetId, Utilisateur utilisateur) {
        Optional<Projet> projetOpt = projetRepository.findById(projetId);
        if (projetOpt.isPresent()) {
            Projet projet = projetOpt.get();
            projet.ajouterMembre(utilisateur);
            projetRepository.save(projet);
        }
    }

    public void supprimerMembre(int projetId, Utilisateur utilisateur) {
        Optional<Projet> projetOpt = projetRepository.findById(projetId);
        if (projetOpt.isPresent()) {
            Projet projet = projetOpt.get();
            projet.supprimerMembre(utilisateur);
            projetRepository.save(projet);
        }
    }

    public void calculerProgression(int projetId) {
        Optional<Projet> projetOpt = projetRepository.findById(projetId);
        if (projetOpt.isPresent()) {
            Projet projet = projetOpt.get();
            projet.calculerProgression();
            projetRepository.save(projet);
        }
    }

    public void genererRapport(int projetId) {
        Optional<Projet> projetOpt = projetRepository.findById(projetId);
        if (projetOpt.isPresent()) {
            Projet projet = projetOpt.get();
            projet.genererRapport();
            projetRepository.save(projet);
        }
    }

    public Projet update(int id, Projet projet) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }
}