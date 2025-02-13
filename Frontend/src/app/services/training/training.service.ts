import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private http: HttpClient) {}

    private apiBaseUrl = 'http://localhost:8000/api/training';

    deleteTraining(trainingId: string): Observable<any> {
      const url = `${this.apiBaseUrl}/${trainingId}`;
      return this.http.delete(url);
    }
}
