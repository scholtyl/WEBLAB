import { StatisticsDTO } from "./DTOs/statisticsDTO";

export class Statistic
{
  constructor(dto: StatisticsDTO) {
    this.machineId = dto.machineId;
    this.machine_name = dto.machine_name;
    this.training_month = dto.training_month;
    this.avg_weight = dto.avg_weight;
  }

  machineId: string;
  machine_name: string;
  training_month: string;
  avg_weight: string;
}
