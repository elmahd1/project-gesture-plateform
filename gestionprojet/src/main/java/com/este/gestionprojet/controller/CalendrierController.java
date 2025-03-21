package com.este.gestionprojet.controller;

import com.este.gestionprojet.model.entity.Calendrier;
import com.este.gestionprojet.service.CalendrierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendriers")
public class CalendrierController {

    @Autowired
    private CalendrierService calendrierService;

    // GET: Fetch all calendriers
    @GetMapping
    public ResponseEntity<List<Calendrier>> getAllCalendriers() {
        List<Calendrier> calendriers = calendrierService.findAll();
        return ResponseEntity.ok(calendriers);
    }

    // GET: Fetch a single calendrier by ID
    @GetMapping("/{id}")
    public ResponseEntity<Calendrier> getCalendrierById(@PathVariable int id) {
        return calendrierService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST: Create a new calendrier
    @PostMapping
    public ResponseEntity<Calendrier> createCalendrier(@RequestBody Calendrier calendrier) {
        Calendrier savedCalendrier = calendrierService.save(calendrier);
        return ResponseEntity.ok(savedCalendrier);
    }

    // PUT: Update an existing calendrier
    @PutMapping("/{id}")
    public ResponseEntity<Calendrier> updateCalendrier(@PathVariable int id, @RequestBody Calendrier calendrierDetails) {
        return calendrierService.findById(id)
                .map(existingCalendrier -> {
                    existingCalendrier.setEvenements(calendrierDetails.getEvenements());
                    // Update other fields as needed
                    Calendrier updatedCalendrier = calendrierService.save(existingCalendrier);
                    return ResponseEntity.ok(updatedCalendrier);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE: Delete a calendrier by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCalendrier(@PathVariable int id) {
        if (calendrierService.findById(id).isPresent()) {
            calendrierService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}