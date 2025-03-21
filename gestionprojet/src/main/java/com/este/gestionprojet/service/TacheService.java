package com.este.gestionprojet.service;

import com.este.gestionprojet.model.entity.Tache;
import com.este.gestionprojet.repository.TacheRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.este.gestionprojet.model.enums.Statut;
import com.este.gestionprojet.model.entity.Utilisateur;
import java.util.List;
import java.util.Optional;

@Service
public class TacheService {

    @Autowired
    private TacheRepo tacheRepository;

    public List<Tache> findAll() {
        return tacheRepository.findAll();
    }

    public Optional<Tache> findById(int id) {
        return tacheRepository.findById(id);
    }

    public Tache save(Tache tache) {
        return tacheRepository.save(tache);
    }

    public void deleteById(int id) {
        tacheRepository.deleteById(id);
    }

    public void assignerUtilisateur(int tacheId, Utilisateur utilisateur) {
        Optional<Tache> tacheOpt = tacheRepository.findById(tacheId);
        if (tacheOpt.isPresent()) {
            Tache tache = tacheOpt.get();
            tache.setUtilisateur(utilisateur);
            tacheRepository.save(tache);
        }
    }

    public void changerStatut(int tacheId, Statut statut) {
        Optional<Tache> tacheOpt = tacheRepository.findById(tacheId);
        if (tacheOpt.isPresent()) {
            Tache tache = tacheOpt.get();
            tache.setStatut(statut);
            tacheRepository.save(tache);
        }
    }

    
}