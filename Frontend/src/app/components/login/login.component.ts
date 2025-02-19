import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Input() selectedUser?: string;
  @Output() selectedUserChange = new EventEmitter<string>();

  constructor(private authService: AuthService, private router: Router) {}

  pin: string = '';
  loginFailed: boolean = false;

  onPinChange(): void {
    if (this.pin && this.pin.length >= 4) {
      this.login();
    }
  }

  login(): void {
    this.authService.login(this.selectedUser!, this.pin).subscribe({
      next: (response) => {
        this.loginFailed = false;
        // Store token and set current user data based on decoded token
        this.router.navigate(['/machines']);
      },
      error: (error) => {
        this.loginFailed = true;
        this.pin = '';
      },
    });
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
    this.selectedUserChange.emit(this.selectedUser);
  }
}
