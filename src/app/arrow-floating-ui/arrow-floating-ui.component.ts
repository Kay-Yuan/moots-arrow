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
  @Input() text: string;
  @Input() alignmentAxisOffset = 40;
  @Input() mainAxisOffset = 40;
  @Input() arrowActive = true;
  @Input() isPageReady = true;
  @Input() target: HTMLElement;
  @Input() textPlacement: Placement = 'top';
  @Input() arrowDirection: Direction = 'bottom';
  @Input() arrowStart: Direction = 'bottom';
  @Input() arrowEnd: Direction = 'top';
  @Output() arrowCreated = new EventEmitter<IArrow>();
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
              offset({
                alignmentAxis: this.alignmentAxisOffset,
                mainAxis: this.mainAxisOffset,
              }),
              // flip(),
              shift({ padding: 50 }),
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
        this.arrowStart,
        this.arrowEnd
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
