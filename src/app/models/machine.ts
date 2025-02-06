export class Machine {
  constructor(
    id: number,
    name: string,
    lastTraining?: Date,
    weight?: number
  ) {
    this.id = id;
    this.name = name;
    this.lastTraining = lastTraining;
    this.weight = weight;
  }

  id: number;
  name: string;
  lastTraining?: Date;
  weight?: number;
}
