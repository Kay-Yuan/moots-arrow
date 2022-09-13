import { Component } from '@angular/core';
import { TooltipService } from '../tooltip-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(private tooltipService: TooltipService) {}

  ionViewDidEnter() {
    this.tooltipService.addTooltip(
      'tab2-content',
      'tab2-span',
      'hello world!',
      'top-start'
    );
  }

  ionViewDidLeave() {
    this.tooltipService.clearAll();
  }
}
