import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  computePosition,
  flip,
  shift,
  offset,
  arrow,
  autoUpdate,
  inline,
  Placement,
} from '@floating-ui/dom';
import arrowCreate, { DIRECTION, HEAD, IArrow, Anchor } from 'arrows-svg';
import { ArrowsService } from '../arrows.service';

type Direction =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right';

@Component({
  selector: 'app-arrow-floating-ui',
  templateUrl: './arrow-floating-ui.component.html',
  styleUrls: ['./arrow-floating-ui.component.scss'],
})
export class ArrowFloatingUiComponent implements AfterViewInit, OnDestroy {
  @Input() id: string;
  @Input() targetId: string;
  @Input() tabPage: string;
  @Input() arrowActive = true;
  @Input() isPageReady = true;
  @Input() target: HTMLElement;
  @Input() textPlacement: Placement = 'top';
  @Input() arrowDirection: Direction = 'bottom';
  @Output() arrowCreated = new EventEmitter<IArrow>();
  // pointStart = { x: 0, y: 0 };
  // pointEnd = { x: 400, y: 400 };
  // pathD: string;
  // peakX = 200;
  // peakY = 200;
  private tooltip: HTMLElement;
  private cleanup: any;
  private arrowElement: HTMLElement;
  private arrowTest: IArrow;

  constructor(private arrows: ArrowsService) {}

  ngAfterViewInit() {
    console.log('ngAfterViewInit: ' + this.id);
    // initialize tooltip and arrowElement references
    this.tooltip = document.querySelector(`#${this.id}`);
    // this.arrowElement = document.querySelector(
    //   `#${this.id}-arrow`
    // ) as HTMLElement;
    if (!this.target) {
      this.target = document.querySelector(`#${this.targetId}`);
    }

    setTimeout(() => {
      console.log(this.target.getBoundingClientRect());
      // create and set tooltip
      this.cleanup = autoUpdate(
        this.target,
        this.tooltip,
        () => {
          computePosition(this.target, this.tooltip, {
            placement: this.textPlacement,
            middleware: [
              offset(60),
              // inline(),
              flip(),
              shift({ padding: 5 }),
              // arrow({ element: this.arrowElement }),
            ],
          }).then(({ x, y, placement, middlewareData }) => {
            Object.assign(this.tooltip.style, {
              left: `${x}px`,
              top: `${y}px`,
            });

            // // Accessing the data
            // const { x: arrowX, y: arrowY } = middlewareData.arrow;
            // const staticSide = {
            //   top: 'bottom',
            //   right: 'left',
            //   bottom: 'top',
            //   left: 'right',
            // }[placement.split('-')[0]];

            // Object.assign(this.arrowElement.style, {
            //   left: arrowX != null ? `${arrowX}px` : '',
            //   top: arrowY != null ? `${arrowY}px` : '',
            //   right: '',
            //   bottom: '',
            //   [staticSide]: '-40px',
            // });
          });
        },
        {
          elementResize: false,
        }
      );
    }, 150);

    setTimeout(() => {
      const arrowT = this.arrows.addArrow(
        this.tooltip,
        this.target,
        this.arrowDirection
      );
      document
        .getElementsByTagName(`app-${this.tabPage}`)[0]
        .appendChild(arrowT.node);
      this.arrowTest = arrowT;

      this.arrowCreated.emit(arrowT);
    }, 160);
  }

  ngOnDestroy() {
    this.cleanup();
  }
}
