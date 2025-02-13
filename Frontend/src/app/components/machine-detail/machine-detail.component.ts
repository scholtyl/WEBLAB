import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Machine } from '../../models/machine';
import { Training } from '../../models/training';
import { MachineService } from '../../services/machine/machine.service';
import { DatePipe } from '../../pipes/date-pipe';
import { NgClass } from '@angular/common';
import { TrainingService } from '../../services/training/training.service';

@Component({
  selector: 'app-machine-detail',
  imports: [DatePipe, RouterModule, NgClass],
  templateUrl: './machine-detail.component.html',
  styleUrl: './machine-detail.component.css',
})
export class MachineDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private machineService: MachineService,
    private trainingService: TrainingService
  ) {}

  machine: Machine = { id: 1, lastTraining: new Date('11.11.1111'), name: 'loading...', lastWeight: 0 };
  trainings?: Training[];
  editing: boolean = false;

  editTraining?: Training;

  ngOnInit() {
    this.machineService
      .getTrainingsForMachine(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe(({ machine, trainings }) => {
        this.machine = machine;
        this.trainings = trainings;
      }, console.log);
  }

  submit() {}

  del() {
    this.trainingService.deleteTraining(this.editTraining!.id).subscribe(
      (result) => {
        this.trainings = this.trainings!.filter((training) => training.id !== this.editTraining!.id);
        this.editing = false;
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  edit(id: string) {
    this.editing = true;
    this.editTraining = this.trainings!.find((t) => t.id == id);
  }
}
