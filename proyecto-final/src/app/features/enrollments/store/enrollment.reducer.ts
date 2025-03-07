import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollment.actions';

export const enrollmentFeatureKey = 'enrollment';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(EnrollmentActions.loadEnrollments, state => state),

);

export const enrollmentFeature = createFeature({
  name: enrollmentFeatureKey,
  reducer,
});

