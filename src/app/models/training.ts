export class Training {
  constructor(
    id: number,
    date: Date,
    rep1: number,
    rep2: number,
    rep3: number,
    weight1: number,
    weight2: number,
    weight3: number
  ) {
    this.id = id;
    this.date = date;
    this.rep1 = rep1;
    this.rep2 = rep2;
    this.rep3 = rep3;
    this.weight1 = weight1;
    this.weight2 = weight2;
    this.weight3 = weight3;
  }

  id: number;
  date: Date;
  rep1: number;
  rep2: number;
  rep3: number;
  weight1: number;
  weight2: number;
  weight3: number;
}
