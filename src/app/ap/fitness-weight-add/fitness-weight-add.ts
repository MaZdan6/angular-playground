import {Component, Inject, OnInit} from '@angular/core';

import {Weight} from '../fitness-weight-history/Weight';
import {WeightService} from '../fitness-weight-history/WeightService';
import * as moment from 'moment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'ap-fitness-weight-add',
  templateUrl: './fitness-weight-add.component.html',
  styleUrls: ['./fitness-weight-add.component.scss']
})
export class FitnessWeightAdd implements OnInit {
  private dateFormat = 'YYYY-MM-DD';
  weight: Weight;

  constructor(
    public dialogRef: MatDialogRef<FitnessWeightAdd>
    , @Inject(MAT_DIALOG_DATA) public data: any
    , private service: WeightService) {
    console.log('data: ' + JSON.stringify(data.weight));
    this.weight = data.weight;
  }

  ngOnInit() {
  }

  saveWeight(formValues: any): void {
    this.weight = formValues as Weight;

    this.formatDate();

    if (this.weight.weight && this.weight.date) {

      let weightFromDB: Weight;

      this.service.getWeightByDate(this.weight.date).subscribe({
          next: resp => {
            console.log('getWeightByDate');
            const weights: Weight[] = resp.body;
            if (weights != null) {
              weightFromDB = weights[0];
            }
            this.createOrUpdate(weightFromDB);
          },
          error: err => console.log(err),
        }
      );
    }

  }

  private createOrUpdate(weightFromDB: Weight) {
    if (weightFromDB == null) {
      this.create();
    } else {
      this.update(weightFromDB);
    }
  }

  private create() {
    console.log('addWeight');
    this.service.addWeight(this.weight)
      .subscribe(
        (data: Weight) => {
          console.log(data);
        },
        (err: any) => console.log(err),
        () => {
          this.service.reloadWeightSubject.next(true),
            this.dialogRef.close();
        }
      );
  }

  private update(weightFromDB: Weight) {
    console.log('updateWeight');
    weightFromDB.weight = this.weight.weight;
    this.service.updateWeight(weightFromDB)
      .subscribe(
        () => {
        },
        (err: any) => {
          console.log(err);
        },
        () => {
          this.service.reloadWeightSubject.next(true),
            this.dialogRef.close();
        }
      );
  }

  private formatDate() {
    const date = moment(this.weight.date);
    const dateString: string = date.format(this.dateFormat);
    this.weight.date = dateString;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
