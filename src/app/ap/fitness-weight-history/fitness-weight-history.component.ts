import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {WeightService} from './WeightService';
import {Weight} from './Weight';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FitnessWeightEditComponent} from '../fitness-weight-edit/fitness-weight-edit.component';
import {PageEvent} from '@angular/material/paginator';
import {FitnessWeightAdd} from '../fitness-weight-add/fitness-weight-add';

@Component({
  selector: 'ap-fitness-weight-history',
  templateUrl: './fitness-weight-history.component.html',
  styleUrls: ['./fitness-weight-history.component.scss']
})
export class FitnessWeightHistoryComponent implements OnDestroy, OnChanges, OnInit {

  errorMessage = '';
  weights: Weight[] = [];

  subscription: Subscription;


  // MatPaginator Inputs
  length = '100';
  pageLimit: string = '7';
  page: string = '0';
  pageSizeOptions: number[] = [7, 14, 28];

  // MatPaginator Output
  pageEvent: PageEvent;
  private lastWeight: Weight;

  constructor(private weightService: WeightService, public dialog: MatDialog) {

    this.subscription = weightService.reloadWeightObservable.subscribe(
      reloadWeight => {
        this.ngOnInit();
        console.log('reloadWeight: ' + reloadWeight);
      }
    );
  }

  ngOnInit() {
    this.getPage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
  }

  deleteWeight(id: number) {
    this.weightService.deleteWeight(id)
      .subscribe(
        (data: any) => console.log(data),
        (err: any) => console.log(err),
        () => this.ngOnInit()
      );
    console.warn(`Delete weight ${id}).`);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  openDialogEdit(id: number): void {
    let weightEdited: Weight;
    this.weightService.getWeight(id).toPromise().then((weight: Weight) => {
      weightEdited = weight;

      const dialogRef = this.dialog.open(FitnessWeightEditComponent, {
        width: '400px',
        data: {weight: weightEdited}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });

    });
  }

  getLastWeight(): void {
    let weightFromDB: Weight;
    this.weightService.getlastWeight().subscribe({
        next: resp => {
          console.log('getWeightByDate');
          const weights: Weight[] = resp.body;
          if (weights != null) {
            weightFromDB = weights[0];
            this.lastWeight = weightFromDB;
          }
        },
        error: err => console.log(err),
      }
    );
  }

  openDialogAdd(): void {
    let lastWeight: Weight;
    this.weightService.getlastWeight().subscribe({
        next: resp => {
          console.log('getWeightByDate');
          const weights: Weight[] = resp.body;
          if (weights != null) {
            lastWeight = weights[0];
          }
          lastWeight = lastWeight;
          lastWeight.date = null;
          lastWeight.id = null;
          const dialogRef = this.dialog.open(FitnessWeightAdd, {
            width: '400px',
            data: {weight: lastWeight}
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
        },
        error: err => console.log(err),
      }
    );
  }

  changePage(pageEvent: PageEvent) {


    this.page = pageEvent.pageIndex.toString();
    this.pageLimit = pageEvent.pageSize.toString();
    this.getPage();
  }

  private getPage() {
    this.weightService.getWeightPaginated(this.page, this.pageLimit).subscribe({
        next: resp => {
          this.length = resp.headers.get('X-Total-Count');
          this.weights = resp.body;
          console.log('X-Total-Count: ' + resp.headers.get('X-Total-Count'));
        },
        error: err => this.errorMessage = err
      }
    );
  }


}
