import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Training } from '../../models/training';
import { TrainingDTO } from '../../models/DTOs/trainingDTO';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private http: HttpClient) {}

  private apiBaseUrl = 'http://localhost:8000/api/training';

  deleteTraining(trainingId: string): Observable<any> {
    const url = `${this.apiBaseUrl}/${trainingId}`;
    return this.http.delete(url);
  }

  addTraining(training: Training): Observable<Training[]> {
    const trainingDTO: TrainingDTO = {
      machine_id: training.machineId,
      weight1: training.weight1,
      weight2: training.weight2,
      weight3: training.weight3,
      reps1: training.rep1,
      reps2: training.rep2,
      reps3: training.rep3,
    };

    const url = `${this.apiBaseUrl}`;
    return this.http
      .post<TrainingDTO[]>(url, trainingDTO)
      .pipe(map((response) => response.map((dto) => Training.fromDTO(dto))));
  }
}
