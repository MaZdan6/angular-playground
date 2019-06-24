export enum Category {
  severeThinness = 'Severe Thinness',
  moderateThinness = 'Moderate Thinness',
  mildThinness = 'Mild Thinness',
  normal = 'Normal',
  overweight = 'Overweight',
  obeseClassI = 'Obese Class I',
  obeseClassII = 'Obese Class II',
  obeseClassIII = 'Obese Class III'
}

export enum CategoryMinIndexValue {
  severeThinness = 0,
  moderateThinness = 16,
  mildThinness = 17,
  normal = 18.5,
  overweight = 25,
  obeseClassI = 30,
  obeseClassII = 35,
  obeseClassIII = 40
}


export class BMI {

  constructor(
    public height: number,
    public weight: number,
    public category: string,
    public index: number
  ) {
  }

}
