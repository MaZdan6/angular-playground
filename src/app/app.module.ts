import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ApModule} from './ap/ap.module';
import {FormsModule} from '@angular/forms';
import {FitnessService} from './ap/fitness/FitnessService';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FitnessWeightHistoryComponent} from './ap/fitness-weight-history/fitness-weight-history.component';
import {FitnessWeightEditComponent} from './ap/fitness-weight-edit/fitness-weight-edit.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [FitnessService,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}],
  bootstrap: [AppComponent],
  entryComponents: [FitnessWeightHistoryComponent, FitnessWeightEditComponent],
})
export class AppModule {
}
