import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor(private http: HttpClient, private adminService : AdminService) {}

  selectedFile: File | null = null;
  machineName?: string;
  PIN?: Number;
  fileinput: any;

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
}
