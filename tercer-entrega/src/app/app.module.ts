import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {AuthModule} from "./features/auth/auth.module";

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
      AuthModule
   ],
   providers: [
      provideHttpClient(withFetch())
   ],
   bootstrap: [AppComponent]
})
export class AppModule {
}
