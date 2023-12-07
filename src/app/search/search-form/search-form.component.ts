import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpService} from "../../http.service";
import {FormControl, FormGroup, FormsModule, NgForm} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from "rxjs";
import {SearchDto} from "../../dto/searchDto";
import {SearchComponent} from "../search.component";


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Output() onSearchComplete = new EventEmitter<SearchDto[]>();
  @Output() onSearchError = new EventEmitter<SearchDto[]>();
  @Output() onReset = new EventEmitter<Boolean>();

  @ViewChild('searchForm') searchForm: NgForm | undefined;

  searchFormData = {
    term: '',
    category: 'all',
    location: '',
    distance: 10,
    autoDetect: false
  };

  lat: number = 0;
  lng: number = 0;

  autocompleteList: any = [];
  searchKeywordCtrl = new FormControl();
  autoPrompt: string = '';

  constructor(private httpService : HttpService) { }

  // implemented the auto-complete feature
  ngOnInit(): void {
    this.searchKeywordCtrl.valueChanges.pipe(
      filter(res => {
        return res !== null
      }),
      distinctUntilChanged(),
      debounceTime(200),
      tap(() => {
        this.autocompleteList = []
      }),
      switchMap(value => this.httpService.getAutocomplete(value))
    )
      .subscribe((data) => {
          this.autocompleteList = data;
        }
      )

    this.searchFormData = {
      term: '',
      category: 'all',
      location: '',
      distance: 10,
      autoDetect: false
    };
  }

  onAutoPromptSelect() {
    this.searchFormData.term = this.searchFormData.term;
  }

  displayWith(value: any) {
    // console.log(value);
    if(value === null) return '';
    return value;
  }

  checkBoxOnChange(): boolean {
    if(this.searchFormData.autoDetect) {
      this.searchFormData.location = '';
      return true;
    }
    return false;
  }

  onSearchSubmit = (searchForm: any) => {
    if(searchForm.invalid) {
      if(this.searchFormData.category == null && this.searchFormData.distance == null) {
        this.searchFormData.category = 'all';
        this.searchFormData.distance = 10;
      }
      else {
        this.onSearchError.emit([]);
      }
    }
    if(this.searchFormData.autoDetect){
      this.httpService.getCoordinatesFromIp().subscribe((data) => {
        if(data.loc !== undefined) {
          const coord = data.loc.split(",");
          this.lat = Number(coord[0]);
          this.lng = Number(coord[1]);
          this.performSearch();

        }
        else {
          this.onSearchError.emit([]);
        }
      })
    }
    else {
      if(this.searchFormData.location !== undefined)
        this.httpService.getCoordinates(this.searchFormData.location).subscribe((data) => {
          this.lng = data.lng !== undefined ? data.lng : 0;
          this.lat = data.lat !== undefined ? data.lat : 0;
          this.performSearch();
        })
    }

  }

  convertMilesToMeter(miles: number) {
    return miles * 1609
  }

  performSearch() {
    if(this.searchFormData.term !== undefined && this.searchFormData.category !== undefined && this.searchFormData.distance !== undefined){
      console.log(this.searchFormData);
      console.log(this.lat + "::" + this.lng);
      this.httpService.getSearchResult(this.searchFormData.term, this.lat, this.lng, this.searchFormData.category, this.convertMilesToMeter(this.searchFormData.distance))
        .subscribe((data) => {
          // console.log(data);

          if(data.length === 0) {
            this.onSearchError.emit([]);
            console.log('error');
          }
          // error handling
          if(this.httpService.errorMessage.length > 0) {

            this.onSearchError.emit([]);
            console.log(this.httpService.errorMessage);
            this.httpService.errorMessage = '';
          }

          this.onSearchComplete.emit(data);
        });
    }
  }

  onResetClick(b: any) {
    this.onReset.emit(true);
  }

}
