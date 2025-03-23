import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CalendrierService } from '../../core/services/calendrier.service';
import { EvenementService } from '../../core/services/evenement.service';
import { UtilisateurService } from '../../core/services/utilisateur.service';
import { Evenement } from '../../core/models/evenement.model';
import { Utilisateur } from '../../core/models/utilisateur.model';
import { TypeEvenement } from '../../core/models/enums';

@Component({
  selector: 'app-evenement-form',
  templateUrl: './evenement-form.component.html',
  styleUrls: ['./evenement-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class EvenementFormComponent implements OnInit {
  evenementForm: FormGroup;
  isEditing = false;
  eventId: number | null = null;
  isLoading = false;
  isSubmitting = false;
  error: string | null = null;
  calendrierId: number | null = null;
  users: Utilisateur[] = [];
  
  // Event type options for the form
  typeOptions = [
    { value: TypeEvenement.REUNION, label: 'Réunion' },
    { value: TypeEvenement.JALON, label: 'Jalon' },
    { value: TypeEvenement.ECHEANCE, label: 'Échéance' },
    { value: TypeEvenement.AUTRE, label: 'Autre' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private calendrierService: CalendrierService,
    private evenementService: EvenementService,
    private utilisateurService: UtilisateurService
  ) {
    this.evenementForm = this.fb.group({
      titre: ['', [Validators.required]],
      description: [''],
      dateDebut: ['', [Validators.required]],
      dateFin: ['', [Validators.required]],
      type: [TypeEvenement.REUNION, [Validators.required]],
      participants: [[]]
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    
    // Load users for participant selection
    this.loadUsers();
    
    // Check if we're editing an existing event
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.eventId = +id;
      this.loadEventDetails(+id);
    } else {
      // Just get the first calendar for now
      // In a real app, you might want to allow selection of different calendars
      this.calendrierService.getAllCalendriers().subscribe({
        next: (calendriers) => {
          if (calendriers.length > 0) {
            this.calendrierId = calendriers[0].id!;
          } else {
            this.error = "Aucun calendrier trouvé. Veuillez d'abord créer un calendrier.";
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.error = "Erreur lors du chargement des calendriers";
          console.error(err);
          this.isLoading = false;
        }
      });
    }
  }

  loadEventDetails(id: number): void {
    this.evenementService.getEvenementById(id).subscribe({
      next: (evenement) => {
        // Set the calendrier ID
        if (evenement.calendrier && evenement.calendrier.id) {
          this.calendrierId = evenement.calendrier.id;
        }
        
        // Format dates for the form
        const dateDebut = evenement.dateDebut ? new Date(evenement.dateDebut) : null;
        const dateFin = evenement.dateFin ? new Date(evenement.dateFin) : null;
        
        // Set form values
        this.evenementForm.patchValue({
          titre: evenement.titre,
          description: evenement.description,
          dateDebut: dateDebut ? this.formatDateForInput(dateDebut) : '',
          dateFin: dateFin ? this.formatDateForInput(dateFin) : '',
          type: evenement.type,
          participants: evenement.participants ? evenement.participants.map(p => p.id) : []
        });
        
        this.isLoading = false;
      },
      error: (err) => {
        this.error = "Erreur lors du chargement de l'événement";
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  loadUsers(): void {
    this.utilisateurService.getAllUtilisateurs().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des utilisateurs", err);
      }
    });
  }

  formatDateForInput(date: Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const hours = ('0' + d.getHours()).slice(-2);
    const minutes = ('0' + d.getMinutes()).slice(-2);
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  onSubmit(): void {
    if (this.evenementForm.invalid) {
      return;
    }
    
    if (!this.calendrierId) {
      this.error = "Aucun calendrier sélectionné";
      return;
    }
    
    this.isSubmitting = true;
    const formValues = this.evenementForm.value;
    
    // Prepare participants array
    const participants = this.users.filter(user => 
      formValues.participants.includes(user.id)
    );
    
    const evenement: Evenement = {
      titre: formValues.titre,
      description: formValues.description,
      dateDebut: new Date(formValues.dateDebut),
      dateFin: new Date(formValues.dateFin),
      type: formValues.type,
      participants: participants
    };
    
    if (this.isEditing && this.eventId) {
      // Update existing event
      evenement.id = this.eventId;
      this.evenementService.updateEvenement(this.eventId, evenement).subscribe({
        next: () => {
          this.router.navigate(['/calendrier']);
        },
        error: (err) => {
          this.error = "Erreur lors de la mise à jour de l'événement";
          console.error(err);
          this.isSubmitting = false;
        }
      });
    } else {
      // Create new event
      this.calendrierService.addEvenement(this.calendrierId, evenement).subscribe({
        next: () => {
          this.router.navigate(['/calendrier']);
        },
        error: (err) => {
          this.error = "Erreur lors de la création de l'événement";
          console.error(err);
          this.isSubmitting = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/calendrier']);
  }
}