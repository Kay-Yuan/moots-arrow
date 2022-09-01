import { Component } from '@angular/core';
import { ArrowsService } from '../arrows.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  isExpanded = true;

  constructor(private arrowService: ArrowsService) {}

  onClick() {
    this.isExpanded = !this.isExpanded;
    console.log('isExpanded is ' + this.isExpanded);
  }
}
