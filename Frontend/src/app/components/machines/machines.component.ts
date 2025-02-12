import { Component } from '@angular/core';
import { Machine } from '../../models/machine';
import { MachineService } from '../../services/machine/machine.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'machines-component',
  imports: [],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.css',
})
export class MachinesComponent {
  constructor(private machineService: MachineService, private authService: AuthService, private router: Router) {}

  Machines?: Machine[];

  ngOnInit() {
    this.machineService.getMachines().subscribe((result) => {
      this.Machines = result;
    }, console.log);
  }

  selectMachine(id: number): void {
    this.router.navigate([`/machine/${id}`]);
  }
}
