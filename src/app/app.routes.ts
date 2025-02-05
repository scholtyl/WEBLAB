import { Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';

export const routes: Routes = [
    {
        path: '',
        title: "MY App",
        component: HeroesComponent,
    },
    {
        path: 'msg',
        title: "MY App",
        component: MessagesComponent,
    },
];
