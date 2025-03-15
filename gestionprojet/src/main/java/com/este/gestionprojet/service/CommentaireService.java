package com.este.gestionprojet.service;

import com.este.gestionprojet.model.entity.Commentaire;
import com.este.gestionprojet.repository.CommentaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentaireService {

    @Autowired
    private CommentaireRepository commentaireRepository;

    public List<Commentaire> findAll() {
        return commentaireRepository.findAll();
    }

    public Optional<Commentaire> findById(int id) {
        return commentaireRepository.findById(id);
    }

    public Commentaire save(Commentaire commentaire) {
        return commentaireRepository.save(commentaire);
    }

    public void deleteById(int id) {
        commentaireRepository.deleteById(id);
    }

    public List<Commentaire> findByTacheId(int tacheId) {
        return commentaireRepository.findByTacheId(tacheId);
    }

    public List<Commentaire> findByAuteurId(int auteurId) {
        return commentaireRepository.findByAuteurId(auteurId);
    }
}
```

### Explanation:

1. **Service Class:**
   - `CommentaireService` is annotated with `@Service` to indicate that it's a service component in the Spring context.
   - The service class uses `CommentaireRepository` to perform CRUD operations and business logic related to [Commentaire](http://_vscodecontentref_/1).
   - Methods include:
     - `findAll()`: Retrieves all [Commentaire](http://_vscodecontentref_/2) entities.
     - `findById(int id)`: Retrieves a [Commentaire](http://_vscodecontentref_/3) entity by its ID.
     - `save(Commentaire commentaire)`: Saves a [Commentaire](http://_vscodecontentref_/4) entity.
     - `deleteById(int id)`: Deletes a [Commentaire](http://_vscodecontentref_/5) entity by its ID.
     - `findByTacheId(int tacheId)`: Retrieves all [Commentaire](http://_vscodecontentref_/6) entities associated with a specific `Tache`.
     - `findByAuteurId(int auteurId)`: Retrieves all [Commentaire](http://_vscodecontentref_/7) entities associated with a specific `Auteur`.

This setup ensures that you have a service class to handle the business logic for the [Commentaire](http://_vscodecontentref_/8) entity, making it easier to manage and interact with the [Commentaire](http://_vscodecontentref_/9) data.