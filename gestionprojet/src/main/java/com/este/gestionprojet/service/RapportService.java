package com.este.gestionprojet.service;

import com.este.gestionprojet.model.entity.Rapport;
import com.este.gestionprojet.model.entity.Utilisateur;
import com.este.gestionprojet.repository.RapportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RapportService {

    @Autowired
    private RapportRepo rapportRepository;

    public List<Rapport> findAll() {
        return rapportRepository.findAll();
    }

    public Optional<Rapport> findById(int id) {
        return rapportRepository.findById(id);
    }

    public Rapport save(Rapport rapport) {
        return rapportRepository.save(rapport);
    }

    public void deleteById(int id) {
        rapportRepository.deleteById(id);
    }

    public void exporter(int rapportId) {
        Optional<Rapport> rapportOpt = rapportRepository.findById(rapportId);
        if (rapportOpt.isPresent()) {
            Rapport rapport = rapportOpt.get();
            rapport.exporter();
            rapportRepository.save(rapport);
        }
    }

    public void envoyer(int rapportId, List<Utilisateur> utilisateurs) {
        Optional<Rapport> rapportOpt = rapportRepository.findById(rapportId);
        if (rapportOpt.isPresent()) {
            Rapport rapport = rapportOpt.get();
            rapport.envoyer(utilisateurs);
            rapportRepository.save(rapport);
        }
    }
}