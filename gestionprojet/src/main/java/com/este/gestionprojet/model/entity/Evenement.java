package com.este.gestionprojet.model.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;
import com.este.gestionprojet.model.enums.TypeEvenement;

@Entity
@Table(name = "evenements")
public class Evenement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String titre;
    private String description;
    private Date dateDebut;
    private Date dateFin;
    @ManyToMany
    @JoinTable(
        name = "evenement_utilisateur",
        joinColumns = @JoinColumn(name = "evenement_id"),
        inverseJoinColumns = @JoinColumn(name = "utilisateur_id")
    )
    private List<Utilisateur> participants;
    @Enumerated(EnumType.STRING)
    private TypeEvenement type;
    @ManyToOne
    @JoinColumn(name = "calendrier_id")
    private Calendrier calendrier;

    public Evenement() {
    }

    public Evenement(String titre, String description, Date dateDebut, Date dateFin, List<Utilisateur> participants, TypeEvenement type) {
        this.titre = titre;
        this.description = description;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.participants = participants;
        this.type = type;
    }

    public void notifierParticipants() {
        for (Utilisateur participant : participants) {
            // Implementation for notifying participants
        }
    }

    public void ajouterParticipant(Utilisateur participant) {
        this.participants.add(participant);
    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(Date dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }

    public List<Utilisateur> getParticipants() {
        return participants;
    }

    public void setParticipants(List<Utilisateur> participants) {
        this.participants = participants;
    }

    public TypeEvenement getType() {
        return type;
    }

    public void setType(TypeEvenement type) {
        this.type = type;
    }

    public Calendrier getCalendrier() {
        return calendrier;
    }

    public void setCalendrier(Calendrier calendrier) {
        this.calendrier = calendrier;
    }

    public Date getDate() {
        // Assuming this method should return the start date of the event
        return this.dateDebut;
    }
}