package com.este.gestionprojet.model.entity;
import com.este.gestionprojet.model.enums.Priorite;
import com.este.gestionprojet.model.enums.Role;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "utilisateurs")
public class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    @Enumerated(EnumType.STRING)
    private Role role;
    @ManyToMany(mappedBy = "assignes")
    private List<Tache> tachesAssignees;
    @OneToMany(mappedBy = "utilisateur")
    private List<Notification> notifications;
    public Utilisateur() {
    }
    public Utilisateur(String nom, String prenom, String email, String motDePasse, Role role) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.role = role;
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

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Tache> getTachesAssignees() {
        return tachesAssignees;
    }

    public void setTachesAssignees(List<Tache> tachesAssignees) {
        this.tachesAssignees = tachesAssignees;
    }

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }

    public void assignerTache(Tache tache) {
        this.tachesAssignees.add(tache);
        tache.setUtilisateur(this);
    }

    public void creerCommentaire(Tache tache, String commentaire) {
        Commentaire newCommentaire = new Commentaire(commentaire, this, tache);
        tache.getCommentaires().add(newCommentaire);
    }
    
}
