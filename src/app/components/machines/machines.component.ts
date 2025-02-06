import { Component } from '@angular/core';

@Component({
  selector: 'machines-component',
  imports: [],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.css'
})
export class MachinesComponent {
  
  selectMachine(id: number): void
  {
    console.log(`Selected Machine nr ${id}`)
  }

}
