import { TrainingDTO } from "./DTOs/trainingDTO";

export class Training {
  constructor(training : TrainingDTO
  ) {
    this.id = training.id;
    this.date = new Date(training.date);
    this.rep1 = training.rep1;
    this.rep2 = training.rep2;
    this.rep3 = training.rep3;
    this.weight1 = training.weight1;
    this.weight2 = training.weight2;
    this.weight3 = training.weight3;
  }

  id: string;
  date: Date;
  rep1: number;
  rep2: number;
  rep3: number;
  weight1: number;
  weight2: number;
  weight3: number;
}
