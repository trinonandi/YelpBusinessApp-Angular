import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { BookingsComponent } from './bookings/bookings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SearchFormComponent } from './search/search-form/search-form.component';
import {A11yModule} from "@angular/cdk/a11y";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { SearchResultTableComponent } from './search/search-result-table/search-result-table.component';
import { NoResultCardComponent } from './search/no-result-card/no-result-card.component';
import {CdkListboxModule} from "@angular/cdk/listbox";
import {MatTabsModule} from "@angular/material/tabs";
import { BusinessDetailsCardComponent } from './search/business-details-card/business-details-card.component';
import {GoogleMapsModule} from "@angular/google-maps";
import { ReservationModalComponent } from './search/business-details-card/reservation-modal/reservation-modal.component';
import { ReservationTableComponent } from './bookings/reservation-table/reservation-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    BookingsComponent,
    SearchFormComponent,
    SearchResultTableComponent,
    NoResultCardComponent,
    BusinessDetailsCardComponent,
    ReservationModalComponent,
    ReservationTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    A11yModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CdkListboxModule,
    MatTabsModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
