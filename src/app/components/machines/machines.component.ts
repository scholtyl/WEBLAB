import { Component } from '@angular/core';
import { Machine } from '../../models/machine';
import { MachineService } from '../../services/machine/machine.service';

@Component({
  selector: 'machines-component',
  imports: [],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.css',
})
export class MachinesComponent {
  constructor(private machineService: MachineService) {}

  getMachines(): Machine[] {
    return this.machineService.getMachines();
  }
  selectMachine(id: number): void {
    console.log(`Selected Machine nr ${id}`);
  }
}
