import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-machine-detail',
  imports: [],
  templateUrl: './machine-detail.component.html',
  styleUrl: './machine-detail.component.css'
})
export class MachineDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute){}

  machineId?: number

  ngOnInit()
  {
    this.machineId = Number(this.route.snapshot.paramMap.get("id"));
  }

}
