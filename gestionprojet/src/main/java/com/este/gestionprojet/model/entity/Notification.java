package com.este.gestionprojet.model.entity;

import jakarta.persistence.*;
import java.util.Date;
import com.este.gestionprojet.model.enums.*;
@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String message;
    private Date dateCreation;
    private boolean lue;
    @Enumerated(EnumType.STRING)
    private TypeNotification type;

    @Column(name = "reference_id")
    private int referenceId;

    @ManyToOne
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;
    
    @Column(name = "reference_type")
    private String referenceType;
    public Notification(String message, TypeNotification type, int referenceId, String referenceType) {
        this.message = message;
        this.dateCreation = new Date();
        this.lue = false;
        this.type = type;
        this.referenceId = referenceId;
        this.referenceType = referenceType;
    }

    public void marquerCommeLue() {
        this.lue = true;
    }

    // Getters and setters for all fields
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public boolean isLue() {
        return lue;
    }

    public void setLue(boolean lue) {
        this.lue = lue;
    }

    public TypeNotification getType() {
        return type;
    }

    public void setType(TypeNotification type) {
        this.type = type;
    }

    public void setReferenceInfo(int id, String type) {
        this.referenceId = id;
        this.referenceType = type;
    }
    
    // Méthode utilitaire pour définir la référence à partir d'un objet
    @Transient // Cette annotation indique à JPA d'ignorer cette méthode pour la persistence
    public void setReferenceObject(Object reference) {
        if (reference == null) {
            this.referenceId = 0;
            this.referenceType = null;
            return;
        }
        
        if (reference instanceof Tache) {
            Tache tache = (Tache) reference;
            this.referenceId = tache.getId();
            this.referenceType = "TACHE";
        } else if (reference instanceof Projet) {
            Projet projet = (Projet) reference;
            this.referenceId = projet.getId();
            this.referenceType = "PROJET";
        } else if (reference instanceof Commentaire) {
            Commentaire commentaire = (Commentaire) reference;
            this.referenceId = commentaire.getId();
            this.referenceType = "COMMENTAIRE";
        } else if (reference instanceof Document) {
            Document document = (Document) reference;
            this.referenceId = document.getId();
            this.referenceType = "DOCUMENT";
        } else {
            throw new IllegalArgumentException("Type d'objet de référence non pris en charge: " + reference.getClass().getName());
        }
    }
}