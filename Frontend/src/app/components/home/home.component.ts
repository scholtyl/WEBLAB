import { Component } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  imports: [UserListComponent, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  selectedUser?: string;
}
