import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MachineDetailComponent } from './components/machine-detail/machine-detail.component';
import { MachinesComponent } from './components/machines/machines.component';
import { authGuard } from './routeGuards/auth/auth.guard';
import { antiAuthGuard } from './routeGuards/antiauth/anti-auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { adminGuard } from './routeGuards/admin/admin.guard';
import { StatisticsComponent } from './components/statistics/statistics.component';

export const routes: Routes = [
  {
    path: '',
    title: 'GymTracker',
    component: HomeComponent,
    canActivate: [antiAuthGuard]
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
    path: 'admin',
    title: 'GymTracker',
    component: AdminComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'statistics',
    title: 'GymTracker',
    component: StatisticsComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    title: 'GymTracker',
    redirectTo: '',
  },
];
