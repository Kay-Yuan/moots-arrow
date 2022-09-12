import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import arrowCreate, { DIRECTION, HEAD, IArrow, Anchor } from 'arrows-svg';
import { ArrowsService } from './arrows.service';

class HelpData {
  parent: HTMLElement;
  text: HTMLElement;
  arrow: HTMLElement;
}

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private renderer: Renderer2;

  private elements = new Set<HelpData>();

  constructor(private rendererFactory: RendererFactory2, private arrowService: ArrowsService) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  addHelp(parentId: string, targetId: string, tooltip: string) {
    const parentNode: HTMLElement = document.querySelector(`#${parentId}`);

    const tooltipBox: HTMLElement = this.renderer.createElement('div');
    tooltipBox.textContent = tooltip;
    tooltipBox.style.width = '60px';
    tooltipBox.style.marginLeft = '60px';
    tooltipBox.style.marginTop = '120px';


    this.renderer.appendChild(parentNode, tooltipBox);

    const targetNode: HTMLElement = document.querySelector(`#${targetId}`);

    const arrow = this.arrowService.addArrow(tooltipBox, targetNode, 'top-end', 'bottom-end');

    this.renderer.appendChild(parentNode, arrow.node);

    this.elements.add({parent: parentNode, text: tooltipBox, arrow: arrow.node});
  }

  clear() {
    this.elements.forEach(elem => {
      this.renderer.removeChild(elem.parent, elem.text);
      this.renderer.removeChild(elem.parent, elem.arrow);
    });
  }
}
