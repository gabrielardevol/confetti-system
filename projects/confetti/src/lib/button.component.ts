import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConfettiBackgroundComponent} from '../public-api';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'confetti-button',
  standalone: true,
  imports: [
    ConfettiBackgroundComponent,
    NgClass,
    NgStyle
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

    button.light {
      background: var(--light-button-background);
      color: var(--light-button-text-color);
      text-shadow: var(--light-button-background) 2px 2px 2px;
    }

    button.light:hover {
      background: var(--hover-button-light);
      text-shadow: var(--hover-button-light) 2px 2px 2px;
    }

    button.dark {
      background: var(--dark-button-background);
      color: var(--dark-button-text-color);
      text-shadow: var(--dark-button-background) 2px 2px 2px;
    }

    button.dark:hover {
      background: var(--hover-button-dark);
      text-shadow: var(--hover-button-dark) 2px 2px 2px;

    }

  `],
  template: `
    <button class="confetti-border"  [ngClass]="dark ? 'dark' : 'light'">
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
