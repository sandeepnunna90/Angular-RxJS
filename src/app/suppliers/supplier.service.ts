import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError, Observable, of } from 'rxjs';
import { map, tap, concatMap, mergeMap, switchMap } from 'rxjs/operators';
import { Supplier } from './supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  suppliersUrl = 'api/suppliers';

  // 1, 5, 8 - supplier ids
  // of -> creates an observable stream
  supplierWithMap$ = of(1, 5, 8)
    .pipe(
      map(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
    );

  supplierWithConcatMap$ = of(1, 5, 8)
    .pipe(
      tap(id => console.log(`concatMap source Observable `, id)),
      concatMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
    );

  supplierWithMergeMap$ = of(1, 5, 8)
    .pipe(
      tap(id => console.log(`mergeMap source Observable `, id)),
      mergeMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
    );

  supplierWithSwitchMap$ = of(1, 5, 8)
    .pipe(
      tap(id => console.log(`switchMap source Observable `, id)),
      switchMap(id => this.http.get<Supplier>(`${this.suppliersUrl}/${id}`))
    );
  // higher order observable - subscribes to supplier observable
  // nested subscriptions don't work with async pipe
  constructor(private http: HttpClient) {
    // this.supplierWithMap$
    //   .subscribe(
    //     o => o.subscribe( // o -> inner observable
    //       item => console.log('map result', item)
    //     )
    //   );
    // this.supplierWithConcatMap$.subscribe(item => console.log('concatMap result', item));
    // this.supplierWithMergeMap$.subscribe(item => console.log('mergeMap result', item));
    // this.supplierWithSwitchMap$.subscribe(item => console.log('switchMap result', item));
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
