import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {SearchDto} from "./dto/searchDto"
import {BusinessDetailsDto} from "./dto/businessDetailsDto";
import {CoordinatesDto} from "./dto/coordinatesDto";
import {IpInfoDto} from "./dto/ipInfoDto";
import {catchError, Observable, of, throwError} from "rxjs";
import {BusinessReviewDto} from "./dto/businessReviewDto";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = 'https://expressbusinessapptest-366719.uc.r.appspot.com/api/v1'
  errorMessage = '';
  constructor(private httpClient: HttpClient) { }

  getSearchResult(term: string, latitude: number, longitude: number, category: string, radius: number) {
    const params = new HttpParams().appendAll({'term': term, 'latitude': latitude, 'longitude': longitude, 'category': category, 'radius': radius});
    return this.httpClient.get<SearchDto[]>(this.baseUrl + `/search`, {params})
      .pipe(
        catchError(error => {
          if (error.error instanceof ErrorEvent) {
            this.errorMessage = `Error: ${error.error.message}`;
          } else {
            this.errorMessage = `Error: ${error.message}`;
          }
          return of([]);
        })
      );
  }

  getBusinessDetails(id: string) {
    const params = new HttpParams().set('id', id);
    return this.httpClient.get<BusinessDetailsDto>(this.baseUrl + `/get_business_data`, {params})
      .pipe(
        catchError(error => {
          if (error.error instanceof ErrorEvent) {
            this.errorMessage = `Error: ${error.error.message}`;
          } else {
            this.errorMessage = `Error: ${error.message}`;
          }
          return of(new BusinessDetailsDto());
        })
      );
  }

  getCoordinates(address: string) {
    const params = new HttpParams().set('address', address);
    return this.httpClient.get<CoordinatesDto>(this.baseUrl + `/get_coordinates`, {params})
      .pipe(
        catchError(error => {
          if (error.error instanceof ErrorEvent) {
            this.errorMessage = `Error: ${error.error.message}`;
          } else {
            this.errorMessage = `Error: ${error.message}`;
          }
          return of(new CoordinatesDto());
        })
      );
  }

  getAutocomplete(key: string) {
    const params = new HttpParams().set('keyword', key)
    return this.httpClient.get(this.baseUrl + `/autocomplete`, {params})
      .pipe(
        catchError(error => {
          if (error.error instanceof ErrorEvent) {
            this.errorMessage = `Error: ${error.error.message}`;
          } else {
            this.errorMessage = `Error: ${error.message}`;
          }
          return of([]);
        })
      );
  }

  getCoordinatesFromIp() {
    const url = 'https://ipinfo.io?'+'token=8a45dc3941390d'
    return this.httpClient.get<IpInfoDto>(url)
      .pipe(
        catchError(error => {
          if (error.error instanceof ErrorEvent) {
            this.errorMessage = `Error: ${error.error.message}`;
          } else {
            this.errorMessage = `Error: ${error.message}`;
          }
          return of(new IpInfoDto());
        })
      );
  }

  getReviews(id: string) {
    const params = new HttpParams().set('id', id);
    return this.httpClient.get<BusinessReviewDto[]>(this.baseUrl + `/get_review`, {params})
      .pipe(
        catchError(error => {
          if (error.error instanceof ErrorEvent) {
            this.errorMessage = `Error: ${error.error.message}`;
          } else {
            this.errorMessage = `Error: ${error.message}`;
          }
          return of([]);
        })
      );
  }

}
