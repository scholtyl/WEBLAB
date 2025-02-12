import { Injectable } from '@angular/core';
import { Machine } from '../../models/machine';
import { Training } from '../../models/training';
import { MachineDTO } from '../../models/DTOs/machineDTO';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class MachineService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8000/api/machine/machines';

  getTrainingsForMachine(machineId: number): Training[] {
    return [
      new Training(1, new Date('2025-01-01'), 10, 12, 14, 50, 55, 60),
      new Training(2, new Date('2025-01-02'), 8, 10, 12, 45, 50, 55),
      new Training(3, new Date('2025-01-03'), 9, 11, 13, 48, 53, 58),
      new Training(4, new Date('2025-01-04'), 7, 9, 11, 40, 45, 50),
      new Training(5, new Date('2025-01-05'), 6, 8, 10, 35, 40, 45),
    ];
  }

  getMachines(): Observable<Machine[]> {
    return this.http.get<MachineDTO[]>(this.apiUrl).pipe(map((machines) => machines.map((machineDto) => new Machine(machineDto))));
  }
}
