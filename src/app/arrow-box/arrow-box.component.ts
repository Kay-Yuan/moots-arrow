import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-arrow-box',
  templateUrl: './arrow-box.component.html',
  styleUrls: ['./arrow-box.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({ height: '0px', overflow: 'hidden', opacity: 0 })
      ),
      state('expanded', style({ height: '*', overflow: 'auto', opacity: 1 })),
      transition('collapsed <=> expanded', animate('200ms ease-in-out')),
      transition('expanded => collapsed', animate('200ms ease-in-out')),
    ]),
  ],
})
export class ArrowBoxComponent {
  @Input() id: string;
  @Input() x: number;
  @Input() y: number;

  constructor() {}
}
