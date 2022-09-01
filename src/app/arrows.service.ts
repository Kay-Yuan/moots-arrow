import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PositionAlign, PositionSide } from '@ionic/core';

@Injectable({
  providedIn: 'root',
})
export class ArrowsService {
  constructor(private popoverController: PopoverController) {}

  async presentPopover(
    e: Event,
    componentProps: any,
    side?: PositionSide,
    alignment?: PositionAlign
  ) {
    const popover = await this.popoverController.create({
      component: componentProps,
      event: e,
      cssClass: 'popover',
      side: side ? side : 'bottom',
      alignment: alignment ? alignment : undefined,
      // backdropDismiss: false,
      // showBackdrop: false,
    });

    await popover.present();

    const { role } = await popover.onDidDismiss();
  }
}
