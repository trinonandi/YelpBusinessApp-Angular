import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-no-result-card',
  templateUrl: './no-result-card.component.html',
  styleUrls: ['./no-result-card.component.css']
})
export class NoResultCardComponent implements OnInit {

  @Input() message = '';

  constructor() { }

  ngOnInit(): void {
  }


}
