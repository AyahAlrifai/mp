import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'search-view',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  panelOpenState = false;

  constructor(public router: Router) {
  }

  ngOnInit() {
  }
}
