import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  getUsers() : User[]
  {
    return [ { id: "asd", name: "Laurin", lastTraining: new Date("2001-03-19")}, {id: "asd", name: "Gast", lastTraining: new Date("1241-08-01")}]
  }

  constructor() { }
}
