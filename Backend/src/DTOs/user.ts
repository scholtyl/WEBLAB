export class User {
    constructor(
      id: string,
      name: string,
      lastTraining?: Date,
    ) {
      this.id = id;
      this.name = name;
      this.lastTraining = lastTraining;
    }
  
    id?: string;
    name?: string;
    lastTraining?: Date
  }