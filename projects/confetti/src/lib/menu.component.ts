import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';

interface MenuItem {
  label: string;
  link?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'confetti-menu',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  styleUrls: ['utilities.scss'],
  styles: [`
    a, span {
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: normal;
    }

    a:hover {
      /*background: red;*/
      background: color-mix(in srgb, var(--confetti-primary) 10%, transparent 90%);
    }
  `],
  template: `
    <ul>
      <ng-container *ngFor="let item of menu">
        <li [style.padding-left]="indentation * 16 + 'px'">
          <a *ngIf="item['link']" [routerLink]="item['link']!">{{ item['label'] }}</a>
          <span *ngIf="!item['link']">{{ item['label'] }}</span>

          <!-- Si té fills, crida recursivament -->
          <confetti-menu *ngIf="item['children']" [menu]="item['children']!" [indentation]="indentation + 1"></confetti-menu>
        </li>
      </ng-container>
    </ul>

  `,

})
export class ConfettiMenuComponent {
  @Input() menu: MenuItem[] = [];
  @Input() indentation: number = 0;

}
