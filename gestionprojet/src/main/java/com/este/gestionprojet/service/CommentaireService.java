package com.este.gestionprojet.service;

import com.este.gestionprojet.model.entity.Commentaire;
import com.este.gestionprojet.repository.CommentaireRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentaireService {

    @Autowired
    private CommentaireRepo commentaireRepository;

    public List<Commentaire> findAll() {
        return commentaireRepository.findAll();
    }

    public Optional<Commentaire> findById(int id) {
        return commentaireRepository.findById(id);
    }

    public Commentaire save(Commentaire commentaire) {
        return commentaireRepository.save(commentaire);
    }

    public void deleteById(int id) {
        commentaireRepository.deleteById(id);
    }

    public List<Commentaire> findByTacheId(int tacheId) {
        return commentaireRepository.findByTacheId(tacheId);
    }

    public List<Commentaire> findByAuteurId(int auteurId) {
        return commentaireRepository.findByAuteurId(auteurId);
    }
}
