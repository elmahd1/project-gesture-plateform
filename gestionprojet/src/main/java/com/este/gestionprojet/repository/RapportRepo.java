package com.este.gestionprojet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.este.gestionprojet.model.entity.Rapport;

@Repository
public interface RapportRepo extends JpaRepository<Rapport, Integer> {
   
}
