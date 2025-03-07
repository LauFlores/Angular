import { createAction, props } from '@ngrx/store';

export const setPageTitle = createAction(
  '[Toolbar] Set Page Title',
  props<{ title: string }>()
);
