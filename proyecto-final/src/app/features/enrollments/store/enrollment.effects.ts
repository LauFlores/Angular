import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';

@Injectable()
export class EnrollmentEffects {


  loadEnrollments$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(EnrollmentActions.loadEnrollments),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  constructor(private actions$: Actions) {}
}
