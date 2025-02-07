import { Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './components/home/home.component';
import { MachineDetailComponent } from './components/machine-detail/machine-detail.component';

export const routes: Routes = [
    {
        path: '',
        title: "GymTracker",
        component: HomeComponent,
    },
    {
        path: 'machine/:id',
        title: "GymTracker",
        component: MachineDetailComponent,
    },
    {
        path: '**',
        title: "GymTracker",
        redirectTo: ""
    },
];
