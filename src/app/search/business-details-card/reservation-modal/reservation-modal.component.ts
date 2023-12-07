import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ReservationFromModel} from "../../../dto/reservationFromModel";
import {BusinessDetailsDto} from "../../../dto/businessDetailsDto";
import * as events from "events";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.css']
})
export class ReservationModalComponent implements OnInit  {

  @Input() businessDetails: BusinessDetailsDto = {
    name: '',
    categories: [],
    is_open: false,
    address: [],
    photos: [],
    phone: '',
    price: '',
    transactions: [],
    url: '',
    lat: 0,
    lng: 0,
    id: ''
  }

  @ViewChild('close') close: any;
  @ViewChild('reservationForm') form: any;

  hourDropdown = ['10', '11', '12', '13', '14', '15', '16', '17'];
  minDropdown = ['00', '15', '30', '45'];

  reservationFormData: ReservationFromModel = {
    id: '',
    name: '',
    email: '',
    date: '',
    hour: '',
    min: ''
  }

  minDate: string = '';


  constructor() {

  }

  ngOnInit(): void {

    const date = new Date();
    this.minDate = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');

  }


  onReservationSubmit(event: any) {
    if(this.form.invalid) {
      event.preventDefault()
      event.stopPropagation()
      const form = (<HTMLInputElement>document.getElementById('reservationForm'));
      form.classList.add('was-validated');
      return;
    }

    this.reservationFormData.name = this.businessDetails.name;
    if(this.businessDetails.id) {
      this.reservationFormData.id = this.businessDetails.id;
      localStorage.setItem(this.businessDetails.id, JSON.stringify(this.reservationFormData));
    }


    const form = (<HTMLInputElement>document.getElementById('reservationForm'));
    form.classList.remove('was-validated');
    console.log(this.reservationFormData);
    this.close.nativeElement.click();

  }

  onModalClose() {
    this.form.form.reset();
    this.reservationFormData = {
      id: '',
      name: '',
      email: '',
      date: '',
      hour: '',
      min: ''
    }
    const form = (<HTMLInputElement>document.getElementById('reservationForm'));
    this.form.form.markAsPristine();
    this.form.form.markAsUntouched();
    this.form.form.valid
    form.classList.remove('was-validated');
    form.classList.remove('ng-invalid');

  }

}
