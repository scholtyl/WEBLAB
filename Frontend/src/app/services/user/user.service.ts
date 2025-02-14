import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserDTO } from '../../models/DTOs/userDTO';
import { URLService } from '../url/url.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient){}

  private apiUrl = URLService.BackendURL + '/api/user/users';

  getUsers(): Observable<User[]> {
    return this.http.get<UserDTO[]>(this.apiUrl).pipe(
      map((users) => users.map(userDto => new User(userDto)))
    );
  }
}
