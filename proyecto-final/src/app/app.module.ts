import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {AuthModule} from "./features/auth/auth.module";
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { StoreModule } from '@ngrx/store';
import { rootReducer } from './store/index';

import { StoreDevtoolsModule } from '@ngrx/store-devtools'; // Importar DevTools
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects'; // Importar el entorno




@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      CoreModule,
      SharedModule,
      BrowserAnimationsModule,
      CommonModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatDialogModule,
      MatSlideToggleModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatSnackBarModule,
      MatProgressSpinnerModule,
      AuthModule,
      StoreModule.forRoot(rootReducer),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
      EffectsModule.forRoot([])
   ],

   providers: [
      provideHttpClient(withFetch())
   ],
   bootstrap: [AppComponent]
})
export class AppModule {
}
