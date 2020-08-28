import {Component, OnInit} from '@angular/core';

import {Weight} from '../fitness-weight-history/Weight';
import {WeightService} from '../fitness-weight-history/WeightService';

@Component({
  selector: 'fitness-weight-add',
  templateUrl: './fitness-weight-add.component.html',
  styles: []
})
export class FitnessWeightAdd implements OnInit {

  constructor(private service: WeightService) {
  }

  ngOnInit() {
  }

  saveWeight(formValues: any): void {
    let newWeight: Weight = <Weight> formValues;
    console.log(newWeight);

    this.service.addWeight(newWeight)
      .subscribe(
        (data: Weight) => {
          // alert('Success Adding');
          console.log(data);
        },
        (err: any) => console.log(err),
        () => this.service.reloadWeightSubject.next(true)
      );
  }

}
