import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {WeightService} from './WeightService';
import {Weight} from './Weight';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FitnessWeightEditComponent} from '../fitness-weight-edit/fitness-weight-edit.component';
import {PageEvent} from '@angular/material/paginator';
import {WeightResponseInterceptorInterceptor} from './weight-response-interceptor.interceptor';

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
  page: string = '1';
  pageSizeOptions: number[] = [7, 14, 28];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private weightService: WeightService, public dialog: MatDialog) {

    this.subscription = weightService.reloadWeightObservable.subscribe(
      reloadWeight => {
        this.ngOnInit();
        console.log('reloadWeight: ' + reloadWeight);
      }
    );
  }

  ngOnInit() {
    this.weightService.getWeightPaginated(this.page, this.pageLimit).subscribe({
        next: resp => {
          this.length = resp.headers.get('X-Total-Count');
          this.weights = resp.body;
          console.log('length: ' + this.length);
          console.log('this.weights: ' + this.weights);
        },
        error: err => this.errorMessage = err
      }
    );
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
        // this.animal = result;
      });

    });
  }

  /*
  X-Total-Count: 15
  <http://localhost:3000/weights?_page=4&_limit=2>; rel="next", */
  changePage(pageEvent: PageEvent) {

    console.log('pageEvent.pageIndex: ' + pageEvent.pageIndex);
    console.log('pageEvent.pageSize: ' + pageEvent.pageSize);
    console.log('pageEvent.length: ' + pageEvent.length);

    this.page = pageEvent.pageIndex.toString();
    this.pageLimit = pageEvent.pageSize.toString();

    this.weightService.getWeightPaginated(this.page, this.pageLimit).subscribe({
        next: resp => {
          this.length = resp.headers.get('X-Total-Count');
          this.weights = resp.body;
          console.log('length: ' + this.length);
          console.log('this.weights: ' + this.weights);
        },
        error: err => this.errorMessage = err
      }
    );
    //length
    /*this.interceptor.lengthWeightObservable.subscribe(
      length => {
        this.length = length;
        console.log('length: ' + length);
      }
    );*/
  }
}
