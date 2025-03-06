package com.este.gestionprojet.model.entity;
import com.este.gestionprojet.model.enums.TypeRessource;
import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "ressources")
public class Ressource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nom;
    @Enumerated(EnumType.STRING)
    private TypeRessource type;
    private double cout;
    private boolean disponible;
    @ManyToMany(mappedBy = "ressources")
    private List<Tache> tachesAssociees;
    @ManyToOne
    @JoinColumn(name = "projet_id")
    private Projet projet;    

    public double calculerCoutTotal() {
        return tachesAssociees.stream().mapToDouble(Tache::getCout).sum();
    }

    public boolean verifierDisponibilite(Date dateDebut, Date dateFin) {
        for (Tache tache : tachesAssociees) {
            if ((dateDebut.before(tache.getDateFin()) && dateDebut.after(tache.getDateDebut())) ||
                (dateFin.before(tache.getDateFin()) && dateFin.after(tache.getDateDebut())) ||
                (dateDebut.before(tache.getDateDebut()) && dateFin.after(tache.getDateFin()))) {
                return false;
            }
        }
        return true;
    }

    // Getters and setters for all fields
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

    public TypeRessource getType() {
        return type;
    }

    public void setType(TypeRessource type) {
        this.type = type;
    }

    public double getCout() {
        return cout;
    }

    public void setCout(double cout) {
        this.cout = cout;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    public List<Tache> getTachesAssociees() {
        return tachesAssociees;
    }

    public void setTachesAssociees(List<Tache> tachesAssociees) {
        this.tachesAssociees = tachesAssociees;
    }
}