import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BusinessDetailsDto} from "../../dto/businessDetailsDto";
import {HttpService} from "../../http.service";
import {BusinessReviewDto} from "../../dto/businessReviewDto";
import {ReservationFromModel} from "../../dto/reservationFromModel";

@Component({
  selector: 'app-business-details-card',
  templateUrl: './business-details-card.component.html',
  styleUrls: ['./business-details-card.component.css']
})
export class BusinessDetailsCardComponent implements OnInit {

  @Output() onBackPress = new EventEmitter<boolean>();

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



  reviews: BusinessReviewDto[] = []

  address: string = ''
  category: string | undefined= ''

  mapOptions: google.maps.MapOptions = {
    center: { lat: 38.9987208, lng: -77.2538699 }
  }
  marker = {
    position: { lat: 38.9987208, lng: -77.2538699 },
  }



  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.updateMapCoords()
    this.getReviews()
    this.businessDetails.address?.forEach((e) => {
      this.address += e +' '
    })

    this.category = this.businessDetails.categories?.join(' | ')
  }

  updateMapCoords() {
    const nLat= this.businessDetails?.lat, nLng = this.businessDetails?.lng;
    if(!nLat || !nLng) return;
    this.mapOptions = {
      center: { lat: nLat, lng: nLng }
    }
    this.marker = {
      position: { lat: nLat, lng: nLng },
    }
  }

  backPressed() {
    this.onBackPress.emit(false);
  }

  getReviews() {
    if(this.businessDetails.id === undefined) return;
    this.http.getReviews(this.businessDetails.id).subscribe((data) => {
      this.reviews = data;
    })
  }

  checkReservation() {
    if(this.businessDetails.id)
      return localStorage.getItem(this.businessDetails.id) !== null;

    return false;
  }

  cancelReservation() {
    if(this.businessDetails.id){
      localStorage.removeItem(this.businessDetails.id);
      alert('Reservation cancelled!');
    }

  }
}
