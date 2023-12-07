import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {SearchDto} from "../dto/searchDto";
import {BusinessDetailsDto} from "../dto/businessDetailsDto";
import {observable, Observable, of} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchResults: SearchDto[] | undefined;
  businessData: BusinessDetailsDto | undefined;
  listFlag: boolean = true;
  constructor(private httpService : HttpService) { }

  ngOnInit(): void {
    // this.httpApiTesting();

  }

  showSearchData(searchData: SearchDto[]) {
    console.log(searchData);
    this.searchResults = searchData;
    this.listFlag = true;
  }

  searchError(searchData: SearchDto[]) {
    this.searchResults = searchData
  }

  saveBusinessData(data: BusinessDetailsDto) {
    this.businessData = data;
    this.listFlag = false;
  }

  onBackPressed(flag: boolean) {
    this.listFlag = !flag;
  }

  onReset() {

    this.searchResults = undefined;
    this.businessData = undefined;
  }

}
