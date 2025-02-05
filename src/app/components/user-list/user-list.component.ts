import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'user-list-component',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  @Input() selectedUser?: string;
  @Output() selectedUserChange = new EventEmitter<string>();
  
  selectUser(name: string)
  {
    this.selectedUser = name;
    this.selectedUserChange.emit(name)
  }
}
