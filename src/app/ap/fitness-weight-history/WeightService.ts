import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';

import {Weight} from './Weight';

@Injectable({
  providedIn: 'root'
})
export class WeightService {
  // If using Stackblitz, replace the url with this line
  // because Stackblitz can't find the api folder.
  // private productUrl = 'assets/products/products.json';
  // http://localhost:3000/weights
  // assets/weights/weights.json
  private productUrl = 'http://localhost:3000/weights';
  private basicUrl = 'http://localhost:3000/weights';


  constructor(private http: HttpClient) {
  }

  getWeights(): Observable<Weight[]> {
    return this.http.get<Weight[]>(this.productUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }


  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  addWeight(newWeight: Weight): Observable<Weight> {
    return this.http.post<Weight>(this.basicUrl, newWeight, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

  }
}
