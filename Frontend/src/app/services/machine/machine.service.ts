import { Injectable } from '@angular/core';
import { Machine } from '../../models/machine';
import { Training } from '../../models/training';
import { MachineDTO } from '../../models/DTOs/machineDTO';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { TrainingDTO } from '../../models/DTOs/trainingDTO';
import { URLService } from '../url/url.service';

@Injectable({
  providedIn: 'root',
})

export class MachineService {
  constructor(private http: HttpClient) {}

  private apiBaseUrl = URLService.BackendURL + '/api/machine';

  getTrainingsForMachine(machineId: number): Observable<{ machine: Machine; trainings: Training[] }> {

    const url = `${this.apiBaseUrl}/${machineId}`;
    return this.http.get<{ machine: MachineDTO; trainings: TrainingDTO[] }>(url)
      .pipe(
        map(response => ({
          machine: new Machine(response.machine),
          trainings: response.trainings.map(dto => Training.fromDTO(dto))
        }))
      );
  }

  getMachines(): Observable<Machine[]> {
    const url = `${this.apiBaseUrl}/machines`;
    return this.http.get<MachineDTO[]>(url).pipe(map((machines) => machines.map((machineDto) => new Machine(machineDto))));
  }
}
