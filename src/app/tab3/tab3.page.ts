import { Component } from '@angular/core';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor(private helperService: HelperService) {}

  ionViewDidEnter() {
    this.helperService.addHelp('tab3-content', 'example1', 'Help Text');
  }

  ionViewDidLeave() {
    this.helperService.clear();
  }
}
