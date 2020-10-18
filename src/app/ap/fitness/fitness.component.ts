import {Component, OnInit} from '@angular/core';
import {Weight} from '../fitness-weight-history/Weight';
import {FitnessWeightEditComponent} from '../fitness-weight-edit/fitness-weight-edit.component';
import {MatDialog} from '@angular/material/dialog';
import {FitnessBmiCalculatorComponent} from '../fitness-bmi-calculator/fitness-bmi-calculator.component';

@Component({
  selector: 'ap-fitness',
  templateUrl: './fitness.component.html',
  styleUrls: ['./fitness.component.scss']
})
export class FitnessComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialogBmiCalculator() {
    const dialogRef = this.dialog.open(FitnessBmiCalculatorComponent, {
      width: '400px'
    });
  }
}
