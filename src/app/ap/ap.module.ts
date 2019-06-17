import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathComponent } from './math/math.component';
import { WeatherComponent } from './weather/weather.component';
import { FinanceComponent } from './finance/finance.component';
import { FitnessComponent } from './fitness/fitness.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [MathComponent, WeatherComponent, FinanceComponent, FitnessComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class ApModule { }
