package com.este.gestionprojet.repository;

import com.este.gestionprojet.model.entity.Risque;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  RisqueRepo extends JpaRepository<Risque, Integer>{
    
}
