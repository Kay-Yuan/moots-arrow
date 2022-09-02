import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import {
  computePosition,
  flip,
  shift,
  offset,
  arrow,
  autoUpdate,
} from '@floating-ui/dom';

@Component({
  selector: 'app-arrow-floating-ui',
  templateUrl: './arrow-floating-ui.component.html',
  styleUrls: ['./arrow-floating-ui.component.scss'],
})
export class ArrowFloatingUiComponent implements AfterViewInit, OnDestroy {
  @Input() id: string;
  @Input() targetId: string;
  @Input() hide = true;
  @Input() target: HTMLElement;
  @Input() placement?: string;
  private tooltip: HTMLElement;
  private cleanup: any;
  private arrowElement: HTMLElement;

  constructor() {}

  ngAfterViewInit() {
    // initialize tooltip and arrowElement references
    this.tooltip = document.querySelector(`#${this.id}`) as HTMLElement;
    this.arrowElement = document.querySelector(
      `#${this.id}-arrow`
    ) as HTMLElement;

    setTimeout(() => {
      if (!this.target) {
        this.target = document.querySelector(
          `#${this.targetId}`
        ) as HTMLElement;
      }
      console.log(this.target.getBoundingClientRect());

      // create and set tooltip
      this.cleanup = autoUpdate(this.target, this.tooltip, () => {
        computePosition(this.target, this.tooltip, {
          placement: 'top',
          middleware: [
            offset(6),
            flip(),
            shift({ padding: 5 }),
            arrow({ element: this.arrowElement }),
          ],
        }).then(({ x, y, placement, middlewareData }) => {
          Object.assign(this.tooltip.style, {
            left: `${x}px`,
            top: `${y}px`,
          });

          // Accessing the data
          const { x: arrowX, y: arrowY } = middlewareData.arrow;
          const staticSide = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right',
          }[placement.split('-')[0]];

          Object.assign(this.arrowElement.style, {
            left: arrowX != null ? `${arrowX}px` : '',
            top: arrowY != null ? `${arrowY}px` : '',
            right: '',
            bottom: '',
            [staticSide]: '-4px',
          });
          this.hide = false;
        });
      });
    }, 150);
  }

  ngOnDestroy() {
    this.cleanup();
  }
}
