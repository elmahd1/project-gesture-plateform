package com.este.gestionprojet.model.entity;
import com.este.gestionprojet.model.enums.TypeDocument;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nom;
    private String cheminFichier;
    private Date dateCreation;
    private Date dateDerniereModification;
    @ManyToOne
    @JoinColumn(name = "createur_id")
    private Utilisateur createur;
    @Enumerated(EnumType.STRING)
    private TypeDocument type;

    @ManyToOne
    @JoinColumn(name = "projet_id")
    private Projet projet;

    public Document(String nom, String cheminFichier, Date dateCreation,Utilisateur createur, Date dateDerniereModification, Projet projet, TypeDocument type) {
        this.nom = nom;
        this.cheminFichier = cheminFichier;
        this.dateCreation = dateCreation;
        this.dateDerniereModification = dateDerniereModification;
        this.projet = projet;
        this.type = type;
        this.createur = createur;
    }

    public void telecharger() {
        // Implementation for downloading the document
    }

    public void partager(Utilisateur utilisateur) {
        // Implementation for sharing the document with another user
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getCheminFichier() {
        return cheminFichier;
    }

    public void setCheminFichier(String cheminFichier) {
        this.cheminFichier = cheminFichier;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Date getDateDerniereModification() {
        return dateDerniereModification;
    }

    public void setDateDerniereModification(Date dateDerniereModification) {
        this.dateDerniereModification = dateDerniereModification;
    }

    public Utilisateur getCreateur() {
        return createur;
    }

    public void setCreateur(Utilisateur createur) {
        this.createur = createur;
    }

    public TypeDocument getType() {
        return type;
    }

    public void setType(TypeDocument type) {
        this.type = type;
    }
}