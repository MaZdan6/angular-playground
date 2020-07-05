import {Component, OnInit} from '@angular/core';
import {WeightService} from './WeightService';
import {Weight} from './Weight';

@Component({
  selector: 'ap-fitness-weight-history',
  templateUrl: './fitness-weight-history.component.html',
  styleUrls: ['./fitness-weight-history.component.scss']
})
export class FitnessWeightHistoryComponent implements OnInit {
  errorMessage = '';
  weights: Weight[] = [];

  constructor(private weightService: WeightService) {
  }

  ngOnInit() {
    this.weightService.getWeights().subscribe({
      next: weight => {
        this.weights = weight;
      },
      error: err => this.errorMessage = err
    });
  }
}
