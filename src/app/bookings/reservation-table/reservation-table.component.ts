import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ReservationFromModel} from "../../dto/reservationFromModel";

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.css']
})
export class ReservationTableComponent implements OnInit {

  constructor() { }

  reservations: ReservationFromModel[] = [];


  ngOnInit(): void {
    Object.keys(localStorage).forEach((k) => {
      // console.log(localStorage.getItem(k))
      if(localStorage.getItem(k)) {
        // @ts-ignore
        this.reservations.push(<ReservationFromModel>JSON.parse(localStorage.getItem(k)));
;      }
      // console.log(this.reservations);
    })
  }

  removeReservation(row: any) {
    const key = row.getAttribute('data-id');
    // const idx = row.getAttribute('data-idx');
    // console.log(key);
    this.reservations = this.reservations.filter(r => r.id !== key);
    // console.log(this.reservations);
    localStorage.removeItem(key);
    // console.log("Local" + ":::::");
    // console.log({...localStorage});
    alert('Reservation cancelled!')

  }




}
