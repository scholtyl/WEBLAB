import { MachineDTO } from "./DTOs/machineDTO";

export class Machine {

  constructor(dto: MachineDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.lastTraining = dto.lastTraining ? new Date(dto.lastTraining) : undefined;
    this.lastWeight = this.lastWeight;
  }

  id: number;
  name: string;
  lastTraining?: Date;
  lastWeight?: number;
}
