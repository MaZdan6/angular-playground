import {Category, CategoryMinIndexValue} from './fitness.model';

export class FitnessService {

  minValue = CategoryMinIndexValue;
  cat = Category;

  constructor() {
  }

  public computeBodyMassIndex(height: number, weight: number) {
    const indexBMIString = weight / (Math.pow(height / 100, 2));
    const indexBMI: number = parseFloat(indexBMIString.toFixed(2));
    return indexBMI;
  }

  setCategory(index: number) {

    let category: string;
    category = Category.overweight;

    if (index > this.minValue.obeseClassIII) {
      category = this.cat.obeseClassIII;
    } else if (index > this.minValue.obeseClassIII) {
      category = this.cat.obeseClassIII;
    } else if (index > this.minValue.obeseClassII) {
      category = this.cat.obeseClassII;
    } else if (index > this.minValue.obeseClassI) {
      category = this.cat.obeseClassI;
    } else if (index > this.minValue.overweight) {
      category = this.cat.overweight;
    } else if (index > this.minValue.normal) {
      category = this.cat.normal;
    } else if (index > this.minValue.mildThinness) {
      category = this.cat.mildThinness;
    } else if (index > this.minValue.moderateThinness) {
      category = this.cat.moderateThinness;
    } else if (index > this.minValue.severeThinness) {
      category = this.cat.severeThinness;
    }

    return category;
  }
}
