import { createFeature, createReducer, on } from '@ngrx/store';
import { CourseActions } from './course.actions';

export const courseFeatureKey = 'course';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(CourseActions.loadCourses, state => state),

);

export const courseFeature = createFeature({
  name: courseFeatureKey,
  reducer,
});

