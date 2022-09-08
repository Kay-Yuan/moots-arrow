import { Injectable } from '@angular/core';
import arrowCreate, { DIRECTION, HEAD, IArrow, Anchor } from 'arrows-svg';

@Injectable({
  providedIn: 'root',
})
export class ArrowsService {
  constructor() {}

  addArrow(
    fromNode: HTMLElement,
    toNode: HTMLElement,
    arrowDirection: DIRECTION
  ): IArrow {
    return arrowCreate({
      className: 'arrow-test',
      from: {
        direction:
          arrowDirection.split('-')[0] === 'bottom'
            ? DIRECTION.BOTTOM
            : DIRECTION.RIGHT,
        node: fromNode,
        translation:
          arrowDirection.split('-')[0] === 'bottom' ? [0.7, 0] : [0.4, 0],
      },
      to: {
        direction:
          arrowDirection.split('-')[0] === 'bottom'
            ? DIRECTION.TOP
            : DIRECTION.BOTTOM,
        node: toNode,
        translation:
          arrowDirection.split('-')[0] === 'bottom' ? [0, 0] : [0, 0.5],
      },
      head: {
        func: HEAD.NORMAL,
        size: 13, // custom options that will be passed to head function
        // distance: 1,
      },
      updateDelay: 0,
    });
  }
}
