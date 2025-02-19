import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';
import { Machine } from '../../models/machine';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor(private http: HttpClient, private adminService: AdminService, private userService: UserService) {}

  selectedFile: File | null = null;
  fileinput: any;

  machineName?: string;
  machines: Machine[] = [];

  errorMessagePin?: string;
  PIN?: string;
  users: User[] = [];
  selectedUser?: number;

  ngOnInit() {
    this.getMachines();
    this.getusers();
  }

  // ADD MAchine
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  addMachine(): void {
    if (!this.selectedFile || !this.machineName) return;

    this.adminService.addMachine(this.machineName, this.selectedFile).subscribe({
      next: (response: any) => {
        this.selectedFile = null;
        this.machineName = undefined;
        this.fileinput = undefined;
      },
      error: (error: any) => {
        console.error('Error uploading image', error);
      },
    });
  }

  // De/Activate Machines

  getMachines() {
    this.adminService.getMachines().subscribe({
      next: (response: Machine[]) => {
        this.machines = response;
      },
      error: (error: any) => {
        console.error('Error fetching machines', error);
      },
    });
  }

  switchActivation(machineId: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.machines.find((m) => m.id == machineId)!.isActive = isChecked;

    this.adminService.switchActivation(machineId, isChecked).subscribe({
      error: (error: any) => {
        console.error('Error fetching machines', error);
      },
    });
  }

  // Reset PIN

  getusers() {
    this.userService.getUsers().subscribe({
      next: (response: User[]) => {
        this.users = response;
      },
      error: (error: any) => {
        console.error('Error fetching users', error);
      },
    });
  }

  updatePin() {
    if (!this.PIN || !this.selectedUser) {
      this.errorMessagePin = 'PIN and user must be set!';
      return;
    }

    if (this.PIN.length != 4 || isNaN(Number(this.PIN))) {
      this.errorMessagePin = 'PIN must be 4 digits!';
      return;
    }
    this.errorMessagePin = undefined;

    this.adminService.updatePin(this.selectedUser, this.PIN).subscribe({
      next: (res) => {
        this.PIN = undefined;
      },
      error: (error: any) => {
        console.error('Error setting pin', error);
      },
    });
  }
}
