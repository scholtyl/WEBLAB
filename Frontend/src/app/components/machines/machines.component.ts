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

  ngOnInit() {
    let li = this.authService.isLoggedIn();
    console.log('User is logged in:', this.authService.isLoggedIn());
  }

  getMachines(): Machine[] {
    return this.machineService.getMachines();
  }

  selectMachine(id: number): void {
    this.router.navigate([`/machine/${id}`]);
  }
}
