package com.este.gestionprojet.service;

import com.este.gestionprojet.model.entity.Tache;
import com.este.gestionprojet.model.entity.Utilisateur;
import com.este.gestionprojet.repository.UtilisateurRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UtilisateurService {

    @Autowired
    private UtilisateurRepo utilisateurRepository;

    public List<Utilisateur> findAll() {
        return utilisateurRepository.findAll();
    }

    public Optional<Utilisateur> findById(Long id) {
        return utilisateurRepository.findById(id);
    }

    public Utilisateur save(Utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }

    public void deleteById(Long id) {
        utilisateurRepository.deleteById(id);
    }

    public void assignerTache(Long utilisateurId, Tache tache) {
        Optional<Utilisateur> utilisateurOpt = utilisateurRepository.findById(utilisateurId);
        if (utilisateurOpt.isPresent()) {
            Utilisateur utilisateur = utilisateurOpt.get();
            utilisateur.assignerTache(tache);
            utilisateurRepository.save(utilisateur);
        }
    }

    public void creerCommentaire(Long utilisateurId, Tache tache, String commentaire) {
        Optional<Utilisateur> utilisateurOpt = utilisateurRepository.findById(utilisateurId);
        if (utilisateurOpt.isPresent()) {
            Utilisateur utilisateur = utilisateurOpt.get();
            utilisateur.creerCommentaire(tache, commentaire);
            utilisateurRepository.save(utilisateur);
        }
    }
}