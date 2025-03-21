import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      transition('void => *', [
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class LandingPageComponent implements OnInit {
  isScrolled = false;
  mobileMenuOpen = false;
  currentTestimonial = 0;
  currentYear = new Date().getFullYear();
  
  // Hero stats
  heroStats = [
    {
      title: '10,000+',
      description: 'Utilisateurs actifs',
      icon: 'fas fa-users',
      color: '#6366F1'
    },
    {
      title: '98%',
      description: 'Taux de satisfaction',
      icon: 'fas fa-heart',
      color: '#EC4899'
    },
    {
      title: '24/7',
      description: 'Support client',
      icon: 'fas fa-headset',
      color: '#14B8A6'
    }
  ];
  
  features = [
    {
      title: 'Gestion de Projet',
      description: 'Créez, organisez et suivez vos projets avec des tableaux et des listes personnalisables.',
      icon: 'fas fa-tasks',
      bgColor: '#6366F1'
    },
    {
      title: 'Suivi des Tâches',
      description: 'Assignez des tâches, fixez des échéances et suivez la progression en temps réel.',
      icon: 'fas fa-clipboard-check',
      bgColor: '#8B5CF6'
    },
    {
      title: 'Collaboration d\'Équipe',
      description: 'Commentez, partagez des fichiers et communiquez au sein des tâches et des projets.',
      icon: 'fas fa-users',
      bgColor: '#EC4899'
    },
    {
      title: 'Gestion du Temps',
      description: 'Suivez le temps passé sur les tâches et générez des rapports détaillés.',
      icon: 'fas fa-clock',
      bgColor: '#14B8A6'
    },
    {
      title: 'Tableau de Bord Analytique',
      description: 'Obtenez des insights avec des rapports visuels et des métriques de performance en temps réel.',
      icon: 'fas fa-chart-line',
      bgColor: '#F59E0B'
    },
    {
      title: 'Intégrations Puissantes',
      description: 'Connectez-vous à vos outils favoris comme Slack, Google Drive et plus encore.',
      icon: 'fas fa-plug',
      bgColor: '#10B981'
    }
  ];
  
  steps = [
    {
      title: 'Créez Votre Espace de Travail', 
      description: 'Configurez votre organisation et invitez les membres de votre équipe à collaborer.',
      icon: 'fas fa-rocket',
      color: '#6366F1'
    },
    {
      title: 'Définissez Projets & Tâches',
      description: 'Créez des projets, décomposez-les en tâches gérables et assignez les responsabilités.',
      icon: 'fas fa-tasks', 
      color: '#EC4899'
    },
    {
      title: 'Suivez la Progression',
      description: 'Surveillez l\'état des tâches, les délais du projet et la performance de l\'équipe en temps réel.',
      icon: 'fas fa-chart-line',
      color: '#F59E0B'
    },
    {  
      title: 'Analysez & Améliorez',
      description: 'Utilisez les analyses pour identifier les goulets d\'étranglement et améliorer continuellement votre workflow.',
      icon: 'fas fa-lightbulb',
      color: '#10B981'
    }
  ];
    
  testimonials = [
    {
      content: 'Workflow a transformé la façon dont notre équipe collabore. L\'interface intuitive et les fonctionnalités puissantes ont augmenté notre productivité de 35%.',
      name: 'Sarah Johnson',
      position: 'Chef de Projet',
      company: 'TechCorp',
      bgColor: '#6366F1'
    },
    {
      content: 'En tant que startup, nous avions besoin de quelque chose de flexible mais puissant. Workflow s\'est parfaitement adapté à notre équipe croissante et à nos processus changeants.',
      name: 'Michael Chen', 
      position: 'CEO',
      company: 'InnovateLabs',
      bgColor: '#EC4899'
    },
    {
      content: 'Le tableau de bord analytique nous donne des insights incroyables que nous n\'avions jamais eus auparavant. C\'est comme avoir un consultant en gestion de projet intégré.',
      name: 'Emma Rodriguez',
      position: 'Directrice des Opérations',
      company: 'GlobalMedia',
      bgColor: '#10B981'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  prevTestimonial(): void {
    this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
  }

  nextTestimonial(): void {  
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
  }

  goToTestimonial(index: number): void {
    this.currentTestimonial = index;
  }
}