package com.este.gestionprojet.service;

import com.este.gestionprojet.model.entity.Evenement;
import com.este.gestionprojet.model.entity.Utilisateur;
import com.este.gestionprojet.repository.EvenementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EvenementService {

    @Autowired
    private EvenementRepo evenementRepository;

    public List<Evenement> findAll() {
        return evenementRepository.findAll();
    }

    public Optional<Evenement> findById(int id) {
        return evenementRepository.findById(id);
    }

    public Evenement save(Evenement evenement) {
        return evenementRepository.save(evenement);
    }

    public void deleteById(int id) {
        evenementRepository.deleteById(id);
    }

    public List<Evenement> findByCalendrierId(int calendrierId) {
        return evenementRepository.findByCalendrierId(calendrierId);
    }

    public List<Evenement> findByDate(Date date) {
        return evenementRepository.findByDate(date);
    }

    public void ajouterParticipant(int evenementId, Utilisateur participant) {
        Optional<Evenement> evenementOpt = evenementRepository.findById(evenementId);
        if (evenementOpt.isPresent()) {
            Evenement evenement = evenementOpt.get();
            evenement.ajouterParticipant(participant);
            evenementRepository.save(evenement);
        }
    }

    public void notifierParticipants(int evenementId) {
        Optional<Evenement> evenementOpt = evenementRepository.findById(evenementId);
        if (evenementOpt.isPresent()) {
            Evenement evenement = evenementOpt.get();
            evenement.notifierParticipants();
        }
    }
}