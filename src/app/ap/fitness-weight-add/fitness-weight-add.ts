import {Component, OnInit} from '@angular/core';

import {Weight} from '../fitness-weight-history/Weight';
import {WeightService} from '../fitness-weight-history/WeightService';
import * as moment from 'moment';

@Component({
  selector: 'ap-fitness-weight-add',
  templateUrl: './fitness-weight-add.component.html',
  styleUrls: ['./fitness-weight-add.component.scss']
})
export class FitnessWeightAdd implements OnInit {
  private dateFormat = 'YYYY/MM/DD';
  private weight: Weight;

  constructor(private service: WeightService) {
  }

  ngOnInit() {
  }

  saveWeight(formValues: any): void {
    this.weight = <Weight> formValues;

    this.formatDate();

    if (this.weight.weight && this.weight.date) {

      this.service.addWeight(this.weight)
        .subscribe(
          (data: Weight) => {
            console.log(data);
          },
          (err: any) => console.log(err),
          () => this.service.reloadWeightSubject.next(true)
        );
    }

  }

  private formatDate() {
    const date = moment(this.weight.date);
    const dateString: string = date.format(this.dateFormat);
    this.weight.date = dateString;
  }
}
