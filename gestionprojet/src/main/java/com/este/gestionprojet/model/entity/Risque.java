package com.este.gestionprojet.model.entity;

import jakarta.persistence.*;
import com.este.gestionprojet.model.enums.NiveauImpact;
import com.este.gestionprojet.model.enums.Statut;
@Entity
@Table(name = "risques")
public class Risque {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String description;
    @Enumerated(EnumType.STRING)
    private NiveauImpact impact;
    private float probabilite;
    private String strategie;
    @Enumerated(EnumType.STRING)
    private Statut statut;
    @ManyToOne
    @JoinColumn(name = "responsable_id")
    private Utilisateur responsable;
    @ManyToOne
    @JoinColumn(name = "projet_id")
    private Projet projet;  
    public float calculerScore() {
        return impact.getValeur() * probabilite;
    }

    public void mettreAJour(Statut statut) {
        this.statut = statut;
    }

    // Getters and setters for all fields
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public NiveauImpact getImpact() {
        return impact;
    }

    public void setImpact(NiveauImpact impact) {
        this.impact = impact;
    }

    public float getProbabilite() {
        return probabilite;
    }

    public void setProbabilite(float probabilite) {
        this.probabilite = probabilite;
    }

    public String getStrategie() {
        return strategie;
    }

    public void setStrategie(String strategie) {
        this.strategie = strategie;
    }

    public Statut getStatut() {
        return statut;
    }

    public void setStatut(Statut statut) {
        this.statut = statut;
    }

    public Utilisateur getResponsable() {
        return responsable;
    }

    public void setResponsable(Utilisateur responsable) {
        this.responsable = responsable;
    }
}