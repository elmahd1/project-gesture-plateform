package com.este.gestionprojet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.este.gestionprojet.model.entity.Ressource;

@Repository
public interface RessourceRepo extends JpaRepository<Ressource, Integer> {

}
