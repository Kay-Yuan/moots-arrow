import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  isExpanded = true;
  // direction = 'down';

  constructor() {}

  onClick() {
    this.isExpanded = !this.isExpanded;
    console.log('isExpanded is ' + this.isExpanded);
  }
}
