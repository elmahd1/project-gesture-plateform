package com.este.gestionprojet.repository;

import com.este.gestionprojet.model.entity.Tache;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  TacheRepo extends JpaRepository<Tache, Integer>{
    
}
