import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import {Weight} from './Weight';

@Injectable({
  providedIn: 'root'
})
export class WeightService {

  // http://localhost:3000/weights
  // mock/weights/weights.json
  private basicUrl = 'http://localhost:3000/weights';

  reloadWeightSubject = new Subject<boolean>();
  reloadWeightObservable = this.reloadWeightSubject.asObservable();
  private delete$: Observable<void>;

  constructor(private http: HttpClient) {
  }

  getWeights(): Observable<Weight[]> {
    return this.http.get<Weight[]>(this.basicUrl)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getWeightPaginated(page: string, limit: string): Observable<HttpResponse<Weight[]>> {
    const options = {
      params: new HttpParams()
        .set('_page', page)
        .set('_limit', limit)
        .set('_sort', 'id')
        .set('_order', 'desc'),
      observe: 'response' as const,
      responseType: 'json' as const,
    };

    return this.http.get<Weight[]>(this.basicUrl, options)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getWeight(id: number): Observable<Weight> {
    return this.http.get<Weight>(this.basicUrl.concat(`/${id}`))
      .pipe(
        tap(data => console.log('weight: ' + JSON.stringify(data))),
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


// UPDATE
  updateWeight(updatedWeight: Weight): Observable<void> {
    return this.http.put<void>(this.basicUrl.concat(`/${updatedWeight.id}`), updatedWeight, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

// DELETE
  deleteWeight(id: number): Observable<void> {
    return this.http.delete<void>(this.basicUrl.concat(`/${id}`));
  }


}
