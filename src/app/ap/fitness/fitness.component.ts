import {Component, OnInit} from '@angular/core';
import {BMI, Category} from './fitness.model';
import {FitnessService} from './FitnessService';

export type index = number;

@Component({
  selector: 'ap-fitness',
  templateUrl: './fitness.component.html',
  styleUrls: ['./fitness.component.scss']
})
export class FitnessComponent implements OnInit {
  bmi = new BMI(184, 96, Category.overweight, 0);
  submitted = false;

  constructor(private fService: FitnessService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    console.log('onSubmit()');
    this.bmi.index = this.fService.computeBodyMassIndex(this.bmi.height, this.bmi.weight);
    this.bmi.category= this.fService.setCategory(this.bmi.index);
  }

// TODO: Remove this when we're done
  getDiagnostic() {
    return JSON.stringify(this.bmi);
  }
}
