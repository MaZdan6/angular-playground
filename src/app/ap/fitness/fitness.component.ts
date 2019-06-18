import {Component, OnInit} from '@angular/core';
import {query} from '@angular/animations';
import {BMI} from './fitness.model';
import {NgModel} from '@angular/forms';

export type index = number;

@Component({
  selector: 'ap-fitness',
  templateUrl: './fitness.component.html',
  styleUrls: ['./fitness.component.scss']
})
export class FitnessComponent implements OnInit {
  bmi = new BMI(1, 1, 'male', 1);
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
  }

  // TODO: Remove this when we're done
  getDiagnostic() {
    return JSON.stringify(this.bmi);
  }
}
