package com.este.gestionprojet.service;

import com.este.gestionprojet.model.entity.Calendrier;
import com.este.gestionprojet.model.entity.Evenement;
import com.este.gestionprojet.repository.CalendrierRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CalendrierService {

    @Autowired
    private CalendrierRepo calendrierRepository;

    public List<Calendrier> findAll() {
        return calendrierRepository.findAll();
    }

    public Optional<Calendrier> findById(int id) {
        return calendrierRepository.findById(id);
    }

    public Calendrier save(Calendrier calendrier) {
        return calendrierRepository.save(calendrier);
    }

    public void deleteById(int id) {
        calendrierRepository.deleteById(id);
    }

    public void ajouterEvenement(int calendrierId, Evenement evenement) {
        Optional<Calendrier> calendrierOpt = calendrierRepository.findById(calendrierId);
        if (calendrierOpt.isPresent()) {
            Calendrier calendrier = calendrierOpt.get();
            calendrier.ajouterEvenement(evenement);
            calendrierRepository.save(calendrier);
        }
    }

    public void supprimerEvenement(int calendrierId, Evenement evenement) {
        Optional<Calendrier> calendrierOpt = calendrierRepository.findById(calendrierId);
        if (calendrierOpt.isPresent()) {
            Calendrier calendrier = calendrierOpt.get();
            calendrier.supprimerEvenement(evenement);
            calendrierRepository.save(calendrier);
        }
    }

    public List<Evenement> getEvenementsDate(int calendrierId, Date date) {
        Optional<Calendrier> calendrierOpt = calendrierRepository.findById(calendrierId);
        if (calendrierOpt.isPresent()) {
            Calendrier calendrier = calendrierOpt.get();
            return calendrier.getEvenementsDate(date);
        }
        return null;
    }
}