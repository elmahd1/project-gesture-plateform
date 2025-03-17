package com.este.gestionprojet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.este.gestionprojet.model.entity.Commentaire;

@Repository
public interface CommentaireRepo extends JpaRepository<Commentaire, Integer> {

    List<Commentaire> findByTacheId(int tacheId);

    List<Commentaire> findByAuteurId(int auteurId);
 
}
