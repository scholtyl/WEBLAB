import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';
import { Machine } from '../../models/machine';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor(private http: HttpClient, private adminService: AdminService) {}

  selectedFile: File | null = null;
  machineName?: string;
  PIN?: Number;
  fileinput: any;
  machines: Machine[] = [];

  ngOnInit() {
    this.getMachines();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  addMachine(): void {
    if (!this.selectedFile || !this.machineName) return;

    this.adminService.addMachine(this.machineName, this.selectedFile).subscribe(
      (response: any) => {
        this.selectedFile = null;
        this.machineName = undefined;
        this.fileinput = undefined;
      },
      (error: any) => {
        console.error('Error uploading image', error);
      }
    );
  }

  // De/Activate Machines

  getMachines() {
    this.adminService.getMachines().subscribe(
      (response: Machine[]) => {
        console.log('here');
        this.machines = response;
      },
      (error: any) => {
        console.error('Error fetching machines', error);
      }
    );
  }

  switchActivation(machineId: number, event: Event) {

    const isChecked = (event.target as HTMLInputElement).checked;
    this.machines.find(m => m.id == machineId)!.isActive = isChecked;

    this.adminService.switchActivation(machineId, isChecked).subscribe(
      undefined,
      (error: any) => {
        console.error('Error fetching machines', error);
      }
    );
  }
}
