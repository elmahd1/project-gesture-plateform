package com.este.gestionprojet.service;

import com.este.gestionprojet.model.entity.Risque;
import com.este.gestionprojet.model.enums.Statut;
import com.este.gestionprojet.repository.RisqueRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RisqueService {

    @Autowired
    private RisqueRepo risqueRepository;

    public List<Risque> findAll() {
        return risqueRepository.findAll();
    }

    public Optional<Risque> findById(int id) {
        return risqueRepository.findById(id);
    }

    public Risque save(Risque risque) {
        return risqueRepository.save(risque);
    }

    public void deleteById(int id) {
        risqueRepository.deleteById(id);
    }

    public float calculerScore(int risqueId) {
        Optional<Risque> risqueOpt = risqueRepository.findById(risqueId);
        if (risqueOpt.isPresent()) {
            Risque risque = risqueOpt.get();
            return risque.calculerScore();
        }
        return 0;
    }

    public void mettreAJour(int risqueId, Statut statut) {
        Optional<Risque> risqueOpt = risqueRepository.findById(risqueId);
        if (risqueOpt.isPresent()) {
            Risque risque = risqueOpt.get();
            risque.mettreAJour(statut);
            risqueRepository.save(risque);
        }
    }
}