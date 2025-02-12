import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MachineDetailComponent } from './components/machine-detail/machine-detail.component';
import { MachinesComponent } from './components/machines/machines.component';
import { authGuard } from './routeGuards/auth.guard';

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
    canActivate: [authGuard]
  },
  {
    path: 'machines',
    title: 'GymTracker',
    component: MachinesComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    title: 'GymTracker',
    redirectTo: '',
  },
];
