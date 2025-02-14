import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  addMachine(machineName: string, image :File): Observable<any>
  {
    const formData = new FormData();
    formData.append('image', image, image.name);
    formData.append('name', machineName);

    return this.http.post('http://localhost:8000/upload', formData);
  }
}
