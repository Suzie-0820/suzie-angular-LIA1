import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import {reducers, metaReducers, CustomRouterStateSerializer} from './app.reducer';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    EffectsModule.forRoot([]),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
  {​​​​​​​​ provide:RouterStateSerializer, useClass:CustomRouterStateSerializer }​​​​​​​​,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
