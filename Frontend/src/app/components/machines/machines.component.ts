import { Component } from '@angular/core';
import { Machine } from '../../models/machine';
import { MachineService } from '../../services/machine/machine.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { URLService } from '../../services/url/url.service';

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
    this.machineService.getMachines().subscribe({
      next: (result) => {
        this.Machines = result;
      },
      error: console.log,
    });
  }

  machineURL(id: number) {
    return URLService.BackendURL + `/machines/Machine${id}.jpg`;
  }

  isToday(date?: Date) {
    const now = new Date();
    return (
      date?.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }

  selectMachine(id: number): void {
    this.router.navigate([`/machine/${id}`]);
  }
}
