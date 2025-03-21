package com.este.gestionprojet.controller;

import com.este.gestionprojet.model.entity.Notification;
import com.este.gestionprojet.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    // GET: Fetch all notifications
    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        List<Notification> notifications = notificationService.findAll();
        return ResponseEntity.ok(notifications);
    }

    // GET: Fetch a single notification by ID
    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotificationById(@PathVariable int id) {
        Optional<Notification> notification = notificationService.findById(id);
        return notification.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // POST: Create a new notification
    @PostMapping
    public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
        Notification savedNotification = notificationService.save(notification);
        return ResponseEntity.ok(savedNotification);
    }

    // PUT: Update an existing notification
    @PutMapping("/{id}")
    public ResponseEntity<Notification> updateNotification(@PathVariable int id, @RequestBody Notification notificationDetails) {
        Optional<Notification> notification = notificationService.findById(id);
        if (notification.isPresent()) {
            Notification existingNotification = notification.get();
            existingNotification.setMessage(notificationDetails.getMessage());
            existingNotification.setDateCreation(notificationDetails.getDateCreation());
            existingNotification.setLue(notificationDetails.isLue());
            existingNotification.setType(notificationDetails.getType());
            existingNotification.setReferenceId(notificationDetails.getReferenceId());
            existingNotification.setReferenceType(notificationDetails.getReferenceType());
            existingNotification.setUtilisateur(notificationDetails.getUtilisateur());
            Notification updatedNotification = notificationService.save(existingNotification);
            return ResponseEntity.ok(updatedNotification);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE: Delete a notification by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable int id) {
        if (notificationService.findById(id).isPresent()) {
            notificationService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST: Mark a notification as read
    @PostMapping("/{id}/marquer-comme-lue")
    public ResponseEntity<String> marquerCommeLue(@PathVariable int id) {
        Optional<Notification> notification = notificationService.findById(id);
        if (notification.isPresent()) {
            notificationService.marquerCommeLue(id);
            return ResponseEntity.ok("Notification marquée comme lue avec succès.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}