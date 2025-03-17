package com.este.gestionprojet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.este.gestionprojet.model.entity.Notification;

@Repository
public interface NotificationRepo extends JpaRepository<Notification, Integer> {

    List<Notification> findByUtilisateurId(int utilisateurId);

}
