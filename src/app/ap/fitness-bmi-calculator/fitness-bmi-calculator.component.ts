import { Component, OnInit } from '@angular/core';
import {BMI, Category} from './fitness.model';
import {FitnessService} from './FitnessService';

@Component({
  selector: 'ap-fitness-bmi-calculator',
  templateUrl: './fitness-bmi-calculator.component.html',
  styleUrls: ['./fitness-bmi-calculator.component.scss']
})
export class FitnessBmiCalculatorComponent implements OnInit {
  bmi = new BMI(184, 96, Category.overweight, 0, 12);
  submitted = false;

  constructor(private fService: FitnessService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    console.log('onSubmit()');
    this.bmi.index = this.fService.computeBodyMassIndex(this.bmi.height, this.bmi.weight);
    this.bmi.category = this.fService.setCategory(this.bmi.index);
    this.bmi.fitWeight = this.fService.calculateFitWeight(this.bmi.height, this.bmi.weight, this.bmi.index);
  }

// TODO: Remove this when we're done
  getDiagnostic() {
    return JSON.stringify(this.bmi);
  }
}

export type index = number;
