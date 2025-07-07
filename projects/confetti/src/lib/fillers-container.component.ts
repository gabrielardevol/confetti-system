import { Component } from '@angular/core';

@Component({
  selector: 'confetti-fillers-container',
  standalone: true,
  template: `
    <div class="confetti-container flex flex-col" style="overflow: auto; height: 100%;">
      <div class="confetti-filler"></div>
      <div class="flex flex-row">
        <div class="confetti-filler"></div>
        <ng-content class="confetti-content"></ng-content>
        <div class="confetti-filler"></div>
      </div>
      <div class="confetti-filler"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    .confetti-container {
      width: 100%;
      height: 100%
    }
    .confetti-filler {
      flex: 1;
    }
    .confetti-content {
      background: blue;
    }
    .flex {
      display: flex;
    }
    .flex-col {
      flex-flow: column;
    }
    .flex-row {
      flex-flow: row;
    }
  `]
})
export class FillersContainerComponent {

}
