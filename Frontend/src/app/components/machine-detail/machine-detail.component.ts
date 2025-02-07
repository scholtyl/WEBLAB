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
  constructor(
    private route: ActivatedRoute,
    private machineService: MachineService
  ) {}

  machine!: Machine;

  getTrainings(): Training[] {
    return this.machineService.getTrainingsForMachine(this.machine.id);
  }

  ngOnInit() {
    this.machine = new Machine(
      Number(this.route.snapshot.paramMap.get('id')),
      'Bauchpresse',
      new Date('1241-08-01'),
      30
    );
  }
}
