import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Training } from '../../models/training';
import { TrainingDTO } from '../../models/DTOs/trainingDTO';
import { URLService } from '../url/url.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private http: HttpClient) {}

  private apiBaseUrl = URLService.BackendURL + '/api/training';

  deleteTraining(trainingId: string): Observable<any> {
    const url = `${this.apiBaseUrl}/${trainingId}`;
    return this.http.delete(url);
  }

  editTraining(training: Training): Observable<any> {
    const trainingDTO: TrainingDTO = {
      id: training.id,
      machine_id: training.machineId,
      date: training.date!.toISOString(),
      weight1: training.weight1,
      weight2: training.weight2,
      weight3: training.weight3,
      reps1: training.rep1,
      reps2: training.rep2,
      reps3: training.rep3,
    };

    return this.http.put(this.apiBaseUrl, trainingDTO);
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

    // result not needed as of now but maybe in future.
    return this.http
      .post<TrainingDTO[]>(this.apiBaseUrl, trainingDTO)
      .pipe(map((response) => response.map((dto) => Training.fromDTO(dto))));
  }
}
