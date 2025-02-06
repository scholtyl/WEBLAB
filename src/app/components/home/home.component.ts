import { Component } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { LoginComponent } from '../login/login.component';
import { MachinesComponent } from '../machines/machines.component';

@Component({
  selector: 'app-home',
  imports: [UserListComponent, LoginComponent, MachinesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  selectedUser?: string
}
