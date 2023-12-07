import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchComponent} from "./search/search.component";
import {BookingsComponent} from "./bookings/bookings.component";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";

const routes: Routes = [
  {path: 'search', component: SearchComponent},
  {path: 'bookings', component: BookingsComponent},
  {path: '', redirectTo: '/search', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Check in details
  exports: [RouterModule]
})
export class AppRoutingModule { }
