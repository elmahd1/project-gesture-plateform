package com.este.gestionprojet.service;

import com.este.gestionprojet.model.entity.Notification;
import com.este.gestionprojet.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> findAll() {
        return notificationRepository.findAll();
    }

    public Optional<Notification> findById(int id) {
        return notificationRepository.findById(id);
    }

    public Notification save(Notification notification) {
        return notificationRepository.save(notification);
    }

    public void deleteById(int id) {
        notificationRepository.deleteById(id);
    }

    public List<Notification> findByUtilisateurId(int utilisateurId) {
        return notificationRepository.findByUtilisateurId(utilisateurId);
    }

    public void marquerCommeLue(int notificationId) {
        Optional<Notification> notificationOpt = notificationRepository.findById(notificationId);
        if (notificationOpt.isPresent()) {
            Notification notification = notificationOpt.get();
            notification.marquerCommeLue();
            notificationRepository.save(notification);
        }
    }

    public void setReferenceInfo(int notificationId, int referenceId, String referenceType) {
        Optional<Notification> notificationOpt = notificationRepository.findById(notificationId);
        if (notificationOpt.isPresent()) {
            Notification notification = notificationOpt.get();
            notification.setReferenceInfo(referenceId, referenceType);
            notificationRepository.save(notification);
        }
    }

    public void setReferenceObject(int notificationId, Object reference) {
        Optional<Notification> notificationOpt = notificationRepository.findById(notificationId);
        if (notificationOpt.isPresent()) {
            Notification notification = notificationOpt.get();
            notification.setReferenceObject(reference);
            notificationRepository.save(notification);
        }
    }
}