import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendrierViewComponent } from './calendrier-view/calendrier-view.component';
import { EvenementFormComponent } from './evenement-form/evenement-form.component';

const routes: Routes = [
  {
    path: '',
    component: CalendrierViewComponent
  },
  {
    path: 'event/new',
    component: EvenementFormComponent
  },
  {
    path: 'event/edit/:id',
    component: EvenementFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendrierRoutingModule { }