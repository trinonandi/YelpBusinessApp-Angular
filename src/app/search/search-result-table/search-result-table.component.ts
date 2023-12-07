import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SearchDto} from "../../dto/searchDto";
import {HttpService} from "../../http.service";
import {BusinessDetailsDto} from "../../dto/businessDetailsDto";

@Component({
  selector: 'app-search-result-table',
  templateUrl: './search-result-table.component.html',
  styleUrls: ['./search-result-table.component.css']
})
export class SearchResultTableComponent implements OnInit {

  @Input() searchDataList: SearchDto[] | undefined = [];

  @Output() onFetchComplete = new EventEmitter<BusinessDetailsDto>()

  constructor(private http: HttpService) { }

  ngOnInit(): void {

  }

  getBusinessDetails(id: string | undefined) {
    if(id === undefined) return;
    this.http.getBusinessDetails(id).subscribe((data) => {
      console.log(data);
      this.onFetchComplete.emit(data);
    })
  }

}
