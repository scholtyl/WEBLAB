import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Machine } from '../../models/machine';
import { Training } from '../../models/training';
import { MachineService } from '../../services/machine/machine.service';
import { DatePipe } from '../../pipes/date-pipe';
import { NgClass } from '@angular/common';
import { TrainingService } from '../../services/training/training.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-machine-detail',
  imports: [DatePipe, RouterModule, NgClass, FormsModule],
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

  editTraining?: Training = new Training();

  ngOnInit() {
    this.machineService
      .getTrainingsForMachine(Number(this.route.snapshot.paramMap.get('id')))
      .subscribe(({ machine, trainings }) => {
        this.machine = machine;
        this.trainings = trainings.reverse();
        this.initTraining();
      }, console.log);
  }

  submit() {
    this.trainingService.addTraining(this.editTraining!).subscribe((result) => {
      this.trainings = result.reverse();
    }, console.log);
  }

  del() {
    this.trainingService.deleteTraining(this.editTraining!.id!).subscribe(
      (result) => {
        this.trainings = this.trainings!.filter((training) => training.id !== this.editTraining!.id);
        this.editing = false;
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  cancel() {
    this.editing = false;
    this.initTraining();
  }

  edit(id: string) {
    this.editing = true;
    this.editTraining = this.trainings!.find((t) => t.id == id);
  }

  initTraining() {
    let lastTraining = this.trainings![0];

    this.editTraining = {
      machineId: lastTraining.machineId,
      rep1: lastTraining.rep1,
      rep2: lastTraining.rep1,
      rep3: lastTraining.rep1,
      weight1: lastTraining.weight1,
      weight2: lastTraining.weight1,
      weight3: lastTraining.weight1,
    };
  }
}
