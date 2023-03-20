import {Component} from '@angular/core';
import { HeaderService } from 'src/app/header/header.service';

@Component({
    template: `
    <h3 style='font-size:7rem;text-align:center;width:100vw'>
      i am not a QA <h3 class="angry" >( ˘︹˘ )</h3>
    </h3>
    <h3 style='font-size:7rem;text-align:center;width:100vw'>
    i am a Developer <h3 class="happy" >(✿◡‿◡)</h3>
  </h3>
  `
})
export class HomeComponent {
 
  constructor(private headerService:HeaderService) {
        this.headerService.updateHeader("");

  }
}