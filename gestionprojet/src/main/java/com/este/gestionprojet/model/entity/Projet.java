package com.este.gestionprojet.model.entity;
import com.este.gestionprojet.model.enums.Statut;
import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "projets")
public class Projet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nom;
    private String description;
    private Date dateDebut;
    private Date dateFin;
    private Statut statut;
    @OneToMany(mappedBy = "projet")
    private List<Tache> taches;
    @ManyToMany
    @JoinTable(
        name = "projet_utilisateur",
        joinColumns = @JoinColumn(name = "projet_id"),
        inverseJoinColumns = @JoinColumn(name = "utilisateur_id")
    )
    private List<Utilisateur> membres;
    @OneToMany(mappedBy = "projet")
    private List<Ressource> ressources;
    @OneToMany(mappedBy = "projet")
    private List<Document> documents;
    @OneToMany(mappedBy = "projet")
    private List<Risque> risques;

    public Projet() {
    }
    public void ajouterTache(Tache tache) {
        this.taches.add(tache);
        tache.setProjet(this);
    }

    public void supprimerTache(Tache tache) {
        this.taches.remove(tache);
        tache.setProjet(null);
    }

    public void ajouterMembre(Utilisateur utilisateur) {
        this.membres.add(utilisateur);
    }

    public void supprimerMembre(Utilisateur utilisateur) {
        this.membres.remove(utilisateur);
    }

    public void calculerProgression() {
        // Implementation for calculating project progress
    }

    public void genererRapport() {
        // Implementation for generating project report
    }

    
    public int getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
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

    public Statut getStatut() {
        return statut;
    }

    public void setStatut(Statut statut) {
        this.statut = statut;
    }

    public List<Tache> getTaches() {
        return taches;
    }

    public void setTaches(List<Tache> taches) {
        this.taches = taches;
    }

    public List<Utilisateur> getMembres() {
        return membres;
    }

    public void setMembres(List<Utilisateur> membres) {
        this.membres = membres;
    }

    public List<Ressource> getRessources() {
        return ressources;
    }

    public void setRessources(List<Ressource> ressources) {
        this.ressources = ressources;
    }

    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }

    public List<Risque> getRisques() {
        return risques;
    }

    public void setRisques(List<Risque> risques) {
        this.risques = risques;
    }
}