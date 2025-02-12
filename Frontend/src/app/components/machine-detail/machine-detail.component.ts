import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Machine } from '../../models/machine';
import { Training } from '../../models/training';
import { MachineService } from '../../services/machine/machine.service';
import { DatePipe } from '../../pipes/date-pipe';

@Component({
  selector: 'app-machine-detail',
  imports: [DatePipe, RouterModule],
  templateUrl: './machine-detail.component.html',
  styleUrl: './machine-detail.component.css',
})
export class MachineDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private machineService: MachineService) {}

  machine: Machine = { id: 1, lastTraining: new Date('11.11.1111'), name: 'loading...', lastWeight: 0 };
  trainings?: Training[];

  ngOnInit() {
    this.machineService
      .getTrainingsForMachine(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe(({ machine, trainings }) => {
        this.machine = machine;
        this.trainings = trainings;
      }, console.log);
  }
}
