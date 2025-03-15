package com.este.gestionprojet.service;

import com.este.gestionprojet.model.entity.Ressource;
import com.este.gestionprojet.repository.RessourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class RessourceService {

    @Autowired
    private RessourceRepository ressourceRepository;

    public List<Ressource> findAll() {
        return ressourceRepository.findAll();
    }

    public Optional<Ressource> findById(int id) {
        return ressourceRepository.findById(id);
    }

    public Ressource save(Ressource ressource) {
        return ressourceRepository.save(ressource);
    }

    public void deleteById(int id) {
        ressourceRepository.deleteById(id);
    }

    public double calculerCoutTotal(int ressourceId) {
        Optional<Ressource> ressourceOpt = ressourceRepository.findById(ressourceId);
        if (ressourceOpt.isPresent()) {
            Ressource ressource = ressourceOpt.get();
            return ressource.calculerCoutTotal();
        }
        return 0;
    }

    public boolean verifierDisponibilite(int ressourceId, Date dateDebut, Date dateFin) {
        Optional<Ressource> ressourceOpt = ressourceRepository.findById(ressourceId);
        if (ressourceOpt.isPresent()) {
            Ressource ressource = ressourceOpt.get();
            return ressource.verifierDisponibilite(dateDebut, dateFin);
        }
        return false;
    }
}