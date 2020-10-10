import {Component, OnInit} from '@angular/core';
import {Weight} from '../fitness-weight-history/Weight';
import {WeightService} from '../fitness-weight-history/WeightService';
import {DataItem, Series} from '../series';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ap-fitness-weight-chart',
  templateUrl: './fitness-weight-chart.component.html',
  styleUrls: ['./fitness-weight-chart.component.scss']
})
export class FitnessWeightChartComponent implements OnInit {

  weights: Weight[] = [];
  series: DataItem[] = [];
  multi: Series[] = [];
  subscription: Subscription;

  view: any[] = [700, 300];
  // options
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'Weight [kg]';
  timeline = false;
  autoScale = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private weightService: WeightService) {
    this.subscription = weightService.reloadWeightObservable.subscribe(
      reloadWeight => {
        this.ngOnInit();
        console.log('reloadWeight: ' + reloadWeight);
      }
    );
  }

  ngOnInit(): void {
    this.weightService.getWeights().subscribe({
      next: weight => {
        this.weights = weight;
      },
      error: err => {
        console.error('error on FitnessWeightChartComponent.ngOnInit()');
      }
    });
    let dataItems: DataItem[] = this.weights.map((weight) => {
      return new DataItem(weight.date, weight.weight);
    });

    let series: Series = new Series();
    series.name = 'Weight';
    series.series = dataItems;
    this.multi = [];
    this.multi.push(series);
    console.log('this.multi');
    console.log(this.multi);
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getPertiod(pertiod: string) {
    console.log('period:' + pertiod);
  }
}
