import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dialog-backdrop" *ngIf="visible" (click)="onBackdropClick($event)">
      <div class="dialog-container">
        <div class="dialog-header">
          <h2>{{title}}</h2>
          <button class="close-btn" (click)="onCancel()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="dialog-body">
          <div [ngClass]="{'warning': type === 'warning', 'danger': type === 'danger', 'info': type === 'info'}">
            <i class="fas" [ngClass]="getIconClass()"></i>
            <p [innerHTML]="message"></p>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn-secondary" (click)="onCancel()">{{cancelText}}</button>
          <button [ngClass]="{'btn-primary': type === 'info', 'btn-warning': type === 'warning', 'btn-danger': type === 'danger'}" 
                  (click)="onConfirm()">
            {{confirmText}}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dialog-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease-in-out;
    }
    
    .dialog-container {
      background-color: var(--white);
      border-radius: 8px;
      width: 100%;
      max-width: 450px;
      animation: slideUp 0.3s ease-in-out;
    }
    
    .dialog-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid var(--gray-200);
    }
    
    .dialog-header h2 {
      margin: 0;
      font-size: 1.2rem;
    }
    
    .close-btn {
      background: transparent;
      border: none;
      font-size: 1rem;
      cursor: pointer;
      color: var(--gray-500);
    }
    
    .dialog-body {
      padding: 20px;
    }
    
    .dialog-body div {
      display: flex;
      align-items: flex-start;
    }
    
    .dialog-body i {
      margin-right: 15px;
      font-size: 1.5rem;
      margin-top: 2px;
    }
    
    .dialog-body .warning i {
      color: var(--yellow);
    }
    
    .dialog-body .danger i {
      color: var(--red);
    }
    
    .dialog-body .info i {
      color: var(--blue);
    }
    
    .dialog-body p {
      margin: 0;
      flex: 1;
    }
    
    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding: 15px 20px;
      border-top: 1px solid var(--gray-200);
    }
    
    .dialog-footer button {
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
    }
    
    .btn-secondary {
      background-color: var(--white);
      border: 1px solid var(--gray-300);
    }
    
    .btn-primary {
      background-color: var(--primary-color);
      color: var(--white);
      border: none;
    }
    
    .btn-warning {
      background-color: var(--yellow);
      color: var(--white);
      border: none;
    }
    
    .btn-danger {
      background-color: var(--red);
      color: var(--white);
      border: none;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class ConfirmDialogComponent {
  @Input() visible: boolean = false;
  @Input() title: string = 'Confirmation';
  @Input() message: string = 'Êtes-vous sûr de vouloir continuer ?';
  @Input() confirmText: string = 'Confirmer';
  @Input() cancelText: string = 'Annuler';
  @Input() type: 'info' | 'warning' | 'danger' = 'info';
  
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  
  getIconClass(): string {
    switch (this.type) {
      case 'warning':
        return 'fa-exclamation-triangle';
      case 'danger':
        return 'fa-exclamation-circle';
      default:
        return 'fa-info-circle';
    }
  }
  
  onConfirm(): void {
    this.confirm.emit();
  }
  
  onCancel(): void {
    this.cancel.emit();
  }
  
  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('dialog-backdrop')) {
      this.cancel.emit();
    }
  }
}