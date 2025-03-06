package com.este.gestionprojet.model.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "calendriers")
public class Calendrier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(mappedBy = "calendrier", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Evenement> evenements;

    public Calendrier() {
        this.evenements = new ArrayList<>();
    }

    public void ajouterEvenement(Evenement evenement) {
        this.evenements.add(evenement);
        evenement.setCalendrier(this);
    }

    public void supprimerEvenement(Evenement evenement) {
        this.evenements.remove(evenement);
        evenement.setCalendrier(null);
    }

    public List<Evenement> getEvenementsDate(Date date) {
        List<Evenement> evenementsDate = new ArrayList<>();
        for (Evenement evenement : evenements) {
            if (evenement.getDate().equals(date)) {
                evenementsDate.add(evenement);
            }
        }
        return evenementsDate;
    }

    // Getters and setters for all fields
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Evenement> getEvenements() {
        return evenements;
    }

    public void setEvenements(List<Evenement> evenements) {
        this.evenements = evenements;
    }
}