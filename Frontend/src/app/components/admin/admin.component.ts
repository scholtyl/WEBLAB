import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor(private http: HttpClient) {}

  selectedFile: File | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);

    // Replace with your server's upload endpoint
    this.http.post('http://localhost:8000/upload', formData).subscribe(
      (response: any) => {
        console.log('Upload successful', response);
      },
      (error: any) => {
        console.error('Error uploading image', error);
      }
    );
  }
}
