import { Component, Input, AfterViewChecked } from '@angular/core';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-arrow-popper',
  templateUrl: './arrow-popper.component.html',
  styleUrls: ['./arrow-popper.component.scss'],
})
export class ArrowPopperComponent implements AfterViewChecked {
  @Input() id: string;
  @Input() targetId: string;
  @Input() hide = false;
  @Input() target: HTMLElement;
  @Input() placement?: string;

  constructor() {}

  ngAfterViewChecked() {
    setTimeout(() => {
      const tooltip = document.querySelector(`#${this.id}`) as HTMLElement;
      // const tooltip = document.querySelector('#popper1') as HTMLElement;
      createPopper(
        this.target
          ? this.target
          : (document.querySelector(`#${this.targetId}`) as HTMLElement),
        tooltip,
        {
          //   placement: 'top',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 8],
              },
            },
          ],
        }
      );
    }, 100);
  }
}
