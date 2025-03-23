import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CalendrierRoutingModule } from './calendrier-routing.module';
import { CalendrierViewComponent } from './calendrier-view/calendrier-view.component';
import { EvenementFormComponent } from './evenement-form/evenement-form.component';

@NgModule({
  declarations: [
    CalendrierViewComponent,
    EvenementFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CalendrierRoutingModule
  ]
})
export class CalendrierModule { }