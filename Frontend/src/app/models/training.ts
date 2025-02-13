import { TrainingDTO } from './DTOs/trainingDTO';

export class Training {
  constructor(
    id?: string,
    machineId?: string,
    date?: Date,
    reps1?: number,
    reps2?: number,
    reps3?: number,
    weight1?: number,
    weight2?: number,
    weight3?: number
  ) {
    this.id = id;
    this.machineId = machineId;
    this.date = date;
    this.rep1 = reps1 ?? 0;
    this.rep2 = reps2 ?? 0;
    this.rep3 = reps3 ?? 0;
    this.weight1 = weight1 ?? 0;
    this.weight2 = weight2 ?? 0;
    this.weight3 = weight3 ?? 0;
  }

  static fromDTO(training: TrainingDTO) {
    return new Training(
      training.id!,
      training.machine_id,
      new Date(training.date!),
      training.reps1,
      training.reps2,
      training.reps3,
      training.weight1,
      training.weight2,
      training.weight3
    );
  }

  id?: string;
  machineId?: string;
  date?: Date;
  rep1: number;
  rep2: number;
  rep3: number;
  weight1: number;
  weight2: number;
  weight3: number;
}
