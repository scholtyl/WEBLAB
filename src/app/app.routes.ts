import { Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        title: "GymTracker",
        component: HomeComponent,
    },
    {
        path: 'machines',
        title: "GymTracker",
        component: MessagesComponent,
    },
];
