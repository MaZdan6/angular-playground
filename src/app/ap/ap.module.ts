import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathComponent } from './math/math.component';
import { WeatherComponent } from './weather/weather.component';
import { FinanceComponent } from './finance/finance.component';

@NgModule({
  declarations: [MathComponent, WeatherComponent, FinanceComponent],
  imports: [
    CommonModule
  ]
})
export class ApModule { }
