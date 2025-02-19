import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { URLService } from '../url/url.service';
import { StatisticsDTO } from '../../models/DTOs/statisticsDTO';
import { Statistic } from '../../models/statistic';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  private apiBaseUrl = URLService.BackendURL + '/api/statistics';

  getStatistics(): Observable<Statistic[]> {
    const url = `${this.apiBaseUrl}`;
    return this.http.get<StatisticsDTO[]>(url).pipe(map((response) => response.map((a) => new Statistic(a))));;
  }
}
