import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MathComponent} from './math/math.component';
import {WeatherComponent} from './weather/weather.component';
import {FinanceComponent} from './finance/finance.component';
import {FitnessComponent} from './fitness/fitness.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {FitnessWeightHistoryComponent} from './fitness-weight-history/fitness-weight-history.component';
import {FitnessWeightAdd} from './fitness-weight-add/fitness-weight-add';
import {FitnessWeightEditComponent} from './fitness-weight-edit/fitness-weight-edit.component';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule
} from '@angular/material-moment-adapter';
import { FitnessBmiCalculatorComponent } from './fitness-bmi-calculator/fitness-bmi-calculator.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { FitnessWeightChartComponent } from './fitness-weight-chart/fitness-weight-chart.component';

@NgModule({
  declarations: [MathComponent
    , WeatherComponent
    , FinanceComponent
    , FitnessComponent
    , FitnessWeightHistoryComponent
    , FitnessWeightAdd
    , FitnessWeightEditComponent, FitnessBmiCalculatorComponent, FitnessWeightChartComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ]
  , entryComponents: [
    FitnessWeightEditComponent
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['YYYY/MM/DD'],
        },
        display: {
          dateInput: 'YYYY/MM/DD',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      }
    },
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ]
})
export class ApModule {
}
