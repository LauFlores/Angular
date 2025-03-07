import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const CourseActions = createActionGroup({
  source: 'Course',
  events: {
    'Load Courses': emptyProps(),
    
    
  }
});
