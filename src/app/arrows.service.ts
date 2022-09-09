import { Injectable } from '@angular/core';
import arrowCreate, { DIRECTION, HEAD, IArrow, Anchor } from 'arrows-svg';

type TranslationArray = { x: number; y: number };
@Injectable({
  providedIn: 'root',
})
export class ArrowsService {
  private startDirection = new Map<DIRECTION, TranslationArray>();
  private endDirection = new Map<DIRECTION, TranslationArray>();

  constructor() {
    this.startDirection.set(DIRECTION.RIGHT, { x: 0, y: 0 });
    this.startDirection.set(DIRECTION.LEFT, { x: 0, y: 0 });
    this.startDirection.set(DIRECTION.TOP, { x: 0, y: 0 });
    this.startDirection.set(DIRECTION.BOTTOM, { x: 0.15, y: 0.5 });

    this.endDirection.set(DIRECTION.TOP, { x: 0, y: -1 });
    this.endDirection.set(DIRECTION.BOTTOM, { x: 0, y: 1 });
  }

  addArrow(
    fromNode: HTMLElement,
    toNode: HTMLElement,
    arrowStart: DIRECTION,
    arrowEnd: DIRECTION
  ): IArrow {
    const startTranslation = this.startDirection.get(arrowStart.split('-')[0]);
    const endTranslation = this.endDirection.get(arrowEnd.split('-')[0]);
    return arrowCreate({
      className: 'arrow-test',
      from: {
        direction: arrowStart,
        node: fromNode,
        translation: [startTranslation.x, startTranslation.y],
      },
      to: {
        direction: arrowEnd,
        node: toNode,
        translation: [endTranslation.x, endTranslation.y],
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
