import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import { DatePipe } from '../../pipes/date-pipe';

@Component({
  selector: 'user-list-component',
  imports: [DatePipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  @Input() selectedUser?: string;
  @Output() selectedUserChange = new EventEmitter<string>();
  
  constructor(private userService: UserService){}

  getUserList(): User[]
  {
    return this.userService.getUsers();
  }

  selectUser(name: string)
  {
    this.selectedUser = name;
    this.selectedUserChange.emit(name)
  }
}
