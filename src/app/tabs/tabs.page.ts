import { Component } from '@angular/core';
import { ArrowsService } from '../arrows.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private arrowService: ArrowsService) {}
}
