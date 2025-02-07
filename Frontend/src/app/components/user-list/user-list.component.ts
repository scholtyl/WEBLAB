import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import { DatePipe } from '../../pipes/date-pipe';

@Component({
  selector: 'user-list-component',
  imports: [DatePipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  @Input() selectedUser?: string;
  @Output() selectedUserChange = new EventEmitter<string>();

  constructor(private userService: UserService) {}

  users: User[] = [];

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  selectUser(name: string) {
    this.selectedUser = name;
    this.selectedUserChange.emit(name);
  }
}
