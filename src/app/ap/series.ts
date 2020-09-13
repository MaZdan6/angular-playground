export class Series {
  name: string;
  series: DataItem[];
}

export class DataItem {
  name: string;
  value: number;

  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}
