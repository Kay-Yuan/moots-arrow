import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor() {}

  ionViewDidEnter() {
    const element: HTMLElement = document.getElementById(
      'trigger-button'
    ) as HTMLElement;
    element.click();
  }
}
