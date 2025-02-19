import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Machine } from '../../models/machine';
import { Training } from '../../models/training';
import { MachineService } from '../../services/machine/machine.service';
import { DatePipe } from '../../pipes/date-pipe';
import { NgClass } from '@angular/common';
import { TrainingService } from '../../services/training/training.service';
import { FormsModule } from '@angular/forms';
import { URLService } from '../../services/url/url.service';

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
    private trainingService: TrainingService,
    private router: Router
  ) {
    // Create dummy machine to load html before ngOnInit
    this.machine = {
      id: Number(this.route.snapshot.paramMap.get('id')),
      lastTraining: new Date('11.11.1111'),
      name: 'loading...',
      lastWeight: 0,
    };
  }

  machine: Machine;
  trainings?: Training[];
  editing: boolean = false;

  editTraining?: Training = new Training();

  ngOnInit() {
    this.machineService.getTrainingsForMachine(Number(this.route.snapshot.paramMap.get('id'))).subscribe({
      next: ({ machine, trainings }) => {
        this.machine = machine;
        this.trainings = trainings.reverse();
        this.initTraining();
      },
      error: console.log,
    });
  }

  submit() {
    if (this.editing) {
      // Submit for EDIT
      this.trainingService.editTraining(this.editTraining!).subscribe({
        next: () => {
          this.editing = false;
          this.ngOnInit();
        },
      });
    } else {
      // Submit for ADD
      this.trainingService.addTraining(this.editTraining!).subscribe({
        next: () => {
          this.router.navigate(['/machines']);
        },
        error: console.log,
      });
    }
  }

  del() {
    this.trainingService.deleteTraining(this.editTraining!.id!).subscribe({
      next: () => {
        this.trainings = this.trainings!.filter((training) => training.id !== this.editTraining!.id);
        this.editing = false;
      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }

  cancel() {
    this.editing = false;
    this.initTraining();
  }

  edit(id: string) {
    this.editing = true;
    this.editTraining = { ...this.trainings!.find((t) => t.id == id) } as Training;
  }

  initTraining() {
    let lastTraining = this.trainings![0];

    if (lastTraining) {
      this.editTraining = {
        machineId: lastTraining.machineId,
        date: lastTraining.date,
        rep1: lastTraining.rep1,
        rep2: lastTraining.rep1,
        rep3: lastTraining.rep1,
        weight1: lastTraining.weight1,
        weight2: lastTraining.weight1,
        weight3: lastTraining.weight1,
      };
    } else {
      this.editTraining = new Training(undefined, String(this.machine.id));
    }
  }

  machineURL(id: number) {
    return URLService.BackendURL + `/machines/Machine${id}.jpg`;
  }
}
