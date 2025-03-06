package com.este.gestionprojet.model.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;
import com.este.gestionprojet.model.enums.Priorite;
import com.este.gestionprojet.model.enums.Statut;

@Entity
@Table(name = "taches")
public class Tache {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String titre;
    private String description;
    @Enumerated(EnumType.STRING)
    private Priorite priorite;
    @Enumerated(EnumType.STRING)
    private Statut statut;
    private Date dateDebut;
    private Date dateFin;
    private int progression;
    @ManyToMany(mappedBy = "tachesAssignees")
    private List<Utilisateur> assignes;
    @OneToMany(mappedBy = "tache")
    private List<Commentaire> commentaires;
    @OneToMany(mappedBy = "tache")
    private List<Ressource> ressources;
    @ManyToOne
    @JoinColumn(name = "projet_id")
    private Projet projet;  
    private double cout;
    
    public void modifierStatut(Statut statut) {
        this.statut = statut;
    }

    public long calculerDuree() {
        return (dateFin.getTime() - dateDebut.getTime()) / (1000 * 60 * 60 * 24);
    }

    public boolean estEnRetard() {
        return new Date().after(dateFin);
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

    public Priorite getPriorite() {
        return priorite;
    }

    public void setPriorite(Priorite priorite) {
        this.priorite = priorite;
    }

    public Statut getStatut() {
        return statut;
    }

    public void setStatut(Statut statut) {
        this.statut = statut;
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

    public int getProgression() {
        return progression;
    }

    public void setProgression(int progression) {
        this.progression = progression;
    }

    public List<Utilisateur> getAssignes() {
        return assignes;
    }

    public void setAssignes(List<Utilisateur> assignes) {
        this.assignes = assignes;
    }

    public List<Commentaire> getCommentaires() {
        return commentaires;
    }

    public void setCommentaires(List<Commentaire> commentaires) {
        this.commentaires = commentaires;
    }

    public List<Ressource> getRessources() {
        return ressources;
    }

    public void setRessources(List<Ressource> ressources) {
        this.ressources = ressources;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setUtilisateur'");
    }
    

    public double getCout() {
        return cout;
    }

    public void setCout(double cout) {
        this.cout = cout;
    }

    public void setProjet(Projet projet) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'setProjet'");
    }
}
