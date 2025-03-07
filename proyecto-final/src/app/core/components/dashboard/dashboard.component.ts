import { Component, OnInit  } from '@angular/core';
import { Store } from '@ngrx/store';
import { setPageTitle } from '../../../store/toolbar/toolbar.actions';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    standalone: false
})
export class DashboardComponent implements OnInit {
    constructor(private store: Store) {}

    ngOnInit(): void {
      // Establecemos el título del dashboard
      this.store.dispatch(setPageTitle({ title: 'Dashboard' }));
    }
  }
  
