package com.este.gestionprojet.model.entity;

import com.este.gestionprojet.model.enums.FormatRapport;
import jakarta.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "rapports")
public class Rapport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String titre;
    private Date dateGeneration;
    @Enumerated(EnumType.STRING)
    private FormatRapport format;
    @ElementCollection
    @CollectionTable(name = "rapport_donnees", joinColumns = @JoinColumn(name = "rapport_id"))
    @MapKeyColumn(name = "cle")
    @Column(name = "valeur")
    private Map<String, String> donnees;

    public Rapport() {
    }

    public Rapport(int id, String titre, Date dateGeneration, FormatRapport format, Map<String, String> donnees) {
        this.id = id;
        this.titre = titre;
        this.dateGeneration = dateGeneration;
        this.format = format;
        this.donnees = donnees;
    }

    public void exporter() {
        // Implementation for exporting the report
    }

    public void envoyer(List<Utilisateur> utilisateurs) {
        for (Utilisateur utilisateur : utilisateurs) {
            // Implementation for sending the report to users
        }
    }

    // Getters and setters for all fields
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

    public Date getDateGeneration() {
        return dateGeneration;
    }

    public void setDateGeneration(Date dateGeneration) {
        this.dateGeneration = dateGeneration;
    }

    public FormatRapport getFormat() {
        return format;
    }

    public void setFormat(FormatRapport format) {
        this.format = format;
    }

    public Map<String, String> getDonnees() {
        return donnees;
    }

    public void setDonnees(Map<String, String> donnees) {
        this.donnees = donnees;
    }
}