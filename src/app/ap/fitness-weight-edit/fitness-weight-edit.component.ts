import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Weight} from '../fitness-weight-history/Weight';
import {WeightService} from '../fitness-weight-history/WeightService';

@Component({
  selector: 'ap-fitness-weight-edit',
  templateUrl: './fitness-weight-edit.component.html',
  styleUrls: ['./fitness-weight-edit.component.scss']
})
export class FitnessWeightEditComponent implements OnInit {
  weight: Weight;

  constructor(
    public dialogRef: MatDialogRef<FitnessWeightEditComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any,
    private weightService: WeightService
  ) {
    console.log('data: ' + JSON.stringify(data.weight));
    this.weight = data.weight;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  editWeight(value: any) {
    this.weight = value;
    console.log(this.weight);

    this.weightService.updateWeight(this.weight)
      .subscribe(
        () => {
        },
        (err: any) => console.log(err),
        () => this.weightService.reloadWeightSubject.next(true)
      );
  }
}
