import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { CourseActions } from './course.actions';

@Injectable()
export class CourseEffects {


  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CourseActions.loadCourses),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });

  constructor(private actions$: Actions) {}
}
