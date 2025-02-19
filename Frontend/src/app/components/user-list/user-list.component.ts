import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { DatePipe } from '../../pipes/date-pipe';
import { User } from '../../models/user';

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
    this.userService.getUsers().subscribe({
      next: (result) => {
        this.users = result;
      },
      error: console.log,
    });
  }

  selectUser(name: string) {
    this.selectedUser = name;
    this.selectedUserChange.emit(name);
  }
}
