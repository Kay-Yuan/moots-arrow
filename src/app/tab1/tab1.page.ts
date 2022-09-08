import { Component, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ArrowsService } from '../arrows.service';
import { IArrow } from 'arrows-svg';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  isPlatformReady = false;
  isPageActive = false;
  arrow1: IArrow;
  arrow2: IArrow;
  arrows = new Set<IArrow>();

  constructor(private platform: Platform) {
    this.platform.ready().then(() => (this.isPlatformReady = true));
  }

  ionViewDidEnter() {
    // add arrow
    setTimeout(() => {
      this.arrows?.forEach((arrow) => {
        document.getElementsByTagName(`app-tab1`)[0].appendChild(arrow.node);
      });
    });
  }

  arrowCreated(arrow: IArrow) {
    this.arrows.add(arrow);
  }

  ionViewDidLeave() {
    // remove arrow
    this.arrows.forEach((arrow) => arrow.clear());
  }
}
