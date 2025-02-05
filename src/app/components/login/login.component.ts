import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'login-component',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Input() selectedUser?: string;
  @Output() selectedUserChange = new EventEmitter<string>();

  pin?: number;

  click(number: number) {
    this.pin = Number(`${this.pin ?? ''}${number}`);
  }

  del() {
    if (this.pin !== undefined) {
      const pinStr = this.pin.toString().slice(0, -1);
      this.pin = pinStr.length > 0 ? Number(pinStr) : undefined;
    }
  }

  back() {
    this.selectedUser = undefined;
    this.selectedUserChange.emit(this.selectedUser)
  }
}
