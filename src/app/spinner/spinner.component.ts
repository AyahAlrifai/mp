import {Component} from '@angular/core';
import { SpinnerService } from './spinner.service';

/**
 * @title Basic progress-spinner
 */
@Component({
  selector: 'spinner',
  templateUrl: 'spinner.component.html',
  styleUrls: ['./spinner.component.css']

})
export class SpinnerComponent {

    constructor(public spinnerService : SpinnerService) {

    }
}