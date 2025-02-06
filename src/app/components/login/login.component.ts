import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'login-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Input() selectedUser?: string;
  @Output() selectedUserChange = new EventEmitter<string>();

  pin: string = '';
  loginFailed: boolean = false;

  onPinChange(): void {
    if (this.pin && this.pin.length >= 4) {
      this.login();
    }
  }

  login(): void {
    console.log('Logging in with PIN:', this.pin);
    this.loginFailed = !this.loginFailed;
    this.pin = "";
  }

  click(number: number) {
    this.pin += number;
    this.onPinChange();
  }

  del() {
    if (this.pin !== undefined) {
      this.pin = this.pin.slice(0, -1);
    }
    this.onPinChange();
  }

  back() {
    this.selectedUser = undefined;
    this.selectedUserChange.emit(this.selectedUser)
  }
}
