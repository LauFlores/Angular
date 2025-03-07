import { createReducer, on } from '@ngrx/store';
import { setPageTitle } from './toolbar.actions';

export interface ToolbarState {
  pageTitle: string;
}

export const initialToolbarState: ToolbarState = {
  pageTitle: '',
};

export const toolbarReducer = createReducer(
  initialToolbarState,
  on(setPageTitle, (state, { title }) => ({ ...state, pageTitle: title }))
);
