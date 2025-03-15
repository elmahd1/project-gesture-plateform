package com.este.gestionprojet.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.este.gestionprojet.model.entity.Calendrier;

@Repository
public interface CalendrierRepo extends JpaRepository<Calendrier, Integer> {
}