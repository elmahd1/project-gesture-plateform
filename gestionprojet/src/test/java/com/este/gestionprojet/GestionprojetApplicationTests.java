package com.este.gestionprojet;

import com.este.gestionprojet.model.entity.Utilisateur;
import com.este.gestionprojet.repository.UtilisateurRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import com.este.gestionprojet.model.enums.Role;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class GestionprojetApplicationTests {

    @Autowired
    private UtilisateurRepo utilisateurRepository;
	Role role = Role.MEMBRE;
    @Test
    @Transactional
    void testUtilisateurDatabaseOperations() {
        // Create a new Utilisateur
        Utilisateur utilisateur = new Utilisateur("John", "Doe", "john.doe@example.com", "password", Role.MEMBRE);
		
		

        // Save the Utilisateur to the database
        utilisateur = utilisateurRepository.save(utilisateur);

        // Retrieve the Utilisateur from the database
        Utilisateur foundUtilisateur = utilisateurRepository.findById(utilisateur.getId()).orElse(null);

        // Verify the Utilisateur was saved and retrieved correctly
        assertThat(foundUtilisateur).isNotNull();
        assertThat(foundUtilisateur.getNom()).isEqualTo("John");
        assertThat(foundUtilisateur.getPrenom()).isEqualTo("Doe");
        assertThat(foundUtilisateur.getEmail()).isEqualTo("john.doe@example.com");
        assertThat(foundUtilisateur.getMotDePasse()).isEqualTo("password");
        assertThat(foundUtilisateur.getRole()).isEqualTo(Role.MEMBRE);
    }
}
