import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MachineDetailComponent } from './components/machine-detail/machine-detail.component';
import { MachinesComponent } from './components/machines/machines.component';

export const routes: Routes = [
  {
    path: '',
    title: 'GymTracker',
    component: HomeComponent,
  },
  {
    path: 'machine/:id',
    title: 'GymTracker',
    component: MachineDetailComponent,
  },
  {
    path: 'machines',
    title: 'GymTracker',
    component: MachinesComponent,
  },
  {
    path: '**',
    title: 'GymTracker',
    redirectTo: '',
  },
];
