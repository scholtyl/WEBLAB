import { Injectable } from '@angular/core';
import { Machine } from '../../models/machine';
import { Training } from '../../models/training';

@Injectable({
  providedIn: 'root'
})

export class MachineService {

  getTrainingsForMachine(machineId: number): Training[] {
    return [
      new Training(1, new Date('2025-01-01'), 10, 12, 14, 50, 55, 60),
      new Training(2, new Date('2025-01-02'), 8, 10, 12, 45, 50, 55),
      new Training(3, new Date('2025-01-03'), 9, 11, 13, 48, 53, 58),
      new Training(4, new Date('2025-01-04'), 7, 9, 11, 40, 45, 50),
      new Training(5, new Date('2025-01-05'), 6, 8, 10, 35, 40, 45)
    ];
  }

  constructor() { }

  getMachines() : Machine[]
  {
    let m1 = new Machine(1,"Bauchpresse", new Date("1241-08-01"), 30) 
    let m2 = new Machine(2,"Beinpresse", new Date("1241-08-01"), 50) 
    let m3 = new Machine(3,"Brustpresse", new Date("1241-08-01"), 35) 
    let m4 = new Machine(4,"Lat-Zug", new Date("1241-08-01"), 40) 
    let m5 = new Machine(5,"Rückenstrecker", new Date("1241-08-01"), 5) 
    let m6 = new Machine(6,"Schulterpresse", new Date("1241-08-01"), 15) 
    return [m1, m2, m3, m4, m5, m6]
  }
}
