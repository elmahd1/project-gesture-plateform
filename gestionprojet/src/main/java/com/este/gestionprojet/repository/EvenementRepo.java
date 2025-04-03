package com.este.gestionprojet.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.este.gestionprojet.model.entity.Evenement;

@Repository
public interface EvenementRepo extends JpaRepository<Evenement, Integer> {

    List<Evenement> findByCalendrierId(int calendrierId);

    List<Evenement> findByDateDebut(Date dateDebut);
    
}
