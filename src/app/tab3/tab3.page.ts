import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor() {}

  ionViewDidEnter() {
    const element: HTMLElement = document.getElementById(
      'trigger-button'
    ) as HTMLElement;
    element.click();
  }
}
