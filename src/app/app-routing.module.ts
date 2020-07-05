import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MathComponent} from './ap/math/math.component';
import {WeatherComponent} from './ap/weather/weather.component';
import {FinanceComponent} from './ap/finance/finance.component';
import {FitnessComponent} from './ap/fitness/fitness.component';

/*mapowanie ścieżek na komponenty*/
const routes: Routes = [
  { path: 'ap', component: HomeComponent},
  { path: 'math', component: MathComponent},
  { path: 'weather', component: WeatherComponent},
  { path: 'finance', component: FinanceComponent},
  { path: 'fitness', component: FitnessComponent},

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
