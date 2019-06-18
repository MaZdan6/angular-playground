import {Component, OnInit} from '@angular/core';
import {BMI} from './fitness.model';

export type index = number;

@Component({
  selector: 'ap-fitness',
  templateUrl: './fitness.component.html',
  styleUrls: ['./fitness.component.scss']
})
export class FitnessComponent implements OnInit {
  bmi = new BMI(184, 96, 'male', 0);
  submitted = false;

  constructor() {
  }

  ngOnInit() {
  }

  calculete(bmi) {
    console.log(`calculete:${this.bmi}`);
  }


  onSubmit() {
    this.submitted = true;
    console.log('onSubmit()');
    //this.bmi.height = ;
    this.bmi.index = Math.round(this.bmi.weight / (Math.pow(this.bmi.height /100, 2)));
  }

  // TODO: Remove this when we're done
  getDiagnostic() {
    return JSON.stringify(this.bmi);
  }
}
