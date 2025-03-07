import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentActions } from './student.actions';

export const studentFeatureKey = 'student';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(StudentActions.loadStudents, state => state),

);

export const studentFeature = createFeature({
  name: studentFeatureKey,
  reducer,
});

