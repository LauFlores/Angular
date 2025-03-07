import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const StudentActions = createActionGroup({
  source: 'Student',
  events: {
    'Load Students': emptyProps(),
    
    
  }
});
