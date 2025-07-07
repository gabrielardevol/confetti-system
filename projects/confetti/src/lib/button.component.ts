import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfettiBackgroundComponent} from './confetti-background.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'confetti-button',
  standalone: true,
  imports: [
    ConfettiBackgroundComponent,
    NgClass
  ],
  styleUrls: ['utilities.scss'],
  styles: [`
    :host {
      display: block;
      width: fit-content;
    }

    button {
      border-radius: 111px;
      overflow: hidden;
      font-weight: 700;
      white-space: nowrap;
      width: min-content;
      padding: 4px 12px;
    }

    button.dark {
      background: #202020;
      color: white;
      text-shadow: #202020 2px 2px 2px;
    }

    button.light {
      background: white;
      color:  #202020;
      text-shadow: white 2px 2px 2px;
    }
  `],
  template: `
    <button class="border border-black" [ngClass]="dark ? 'dark' : 'light'">
      <confetti-background  [density]="60">
        <ng-content></ng-content>
      </confetti-background>
    </button>
  `,

})
export class ConfettiButtonComponent {
  @Output() action = new EventEmitter<void>();
  @Input() dark: boolean = true;
  onCloseClick() {
    this.action.emit(); // Notifica que s'ha de tancar
  }

}
