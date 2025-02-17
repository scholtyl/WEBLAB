import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Machine } from '../../models/machine';
import { MachineDTO } from '../../models/DTOs/machineDTO';
import { URLService } from '../url/url.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  private apiBaseUrl = URLService.BackendURL + '/api/admin';

  addMachine(machineName: string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image, image.name);
    formData.append('name', machineName);

    const url = `${this.apiBaseUrl}/upload`;
    return this.http.post(url, formData);
  }

  getMachines(): Observable<Machine[]> {
    const url = `${this.apiBaseUrl}/machines`;
    return this.http
      .get<MachineDTO[]>(url)
      .pipe(map((machines) => machines.map((machineDto) => new Machine(machineDto))));
  }

  switchActivation(machineId : number, activated: boolean): Observable<any> {
    const url = `${this.apiBaseUrl}/switch`;
    return this.http
      .put<any>(url, {machineId: machineId, toActivated: activated});
  }

  updatePin(userId : number, pin: string): Observable<any> {
    const url = `${this.apiBaseUrl}/setPin`;
    return this.http
      .put<any>(url, {userId: userId, pin: pin});
  }

}
