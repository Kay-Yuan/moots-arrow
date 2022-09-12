import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import arrowCreate, { DIRECTION, HEAD, IArrow, Anchor } from 'arrows-svg';
import { ArrowsService } from './arrows.service';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2, private arrowService: ArrowsService) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  addHelp(parentId: string, targetId: string, tooltip: string) {
    const parentNode = document.querySelector(`#${parentId}`);

    const tooltipBox: HTMLElement = this.renderer.createElement('div');
    tooltipBox.textContent = tooltip;
    tooltipBox.style.width = '60px';
    tooltipBox.style.marginLeft = '60px';
    tooltipBox.style.marginTop = '120px';

    this.renderer.appendChild(parentNode, tooltipBox);

    const targetNode: HTMLElement = document.querySelector(`#${targetId}`);

    let arrow = this.arrowService.addArrow(tooltipBox, targetNode, 'top-end', 'bottom-end');

    this.renderer.appendChild(parentNode, arrow.node);

  }
}
