package com.este.gestionprojet.model.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "commentaires")
public class Commentaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String contenu;
    private Date dateCreation;
    @ManyToOne
    @JoinColumn(name = "auteur_id")
    private Utilisateur auteur;
    @ManyToOne
    @JoinColumn(name = "tache_id")
    private Tache tache;

    public Commentaire() {
    }

    public Commentaire(String contenu, Utilisateur auteur, Tache tache) {
        this.contenu = contenu;
        this.auteur = auteur;
        this.tache = tache;
        this.dateCreation = new Date();
    }

    public void modifier(String contenu) {
        this.contenu = contenu;
        this.dateCreation = new Date();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContenu() {
        return contenu;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Utilisateur getAuteur() {
        return auteur;
    }

    public void setAuteur(Utilisateur auteur) {
        this.auteur = auteur;
    }

    public Tache getTache() {
        return tache;
    }

    public void setTache(Tache tache) {
        this.tache = tache;
    }
}