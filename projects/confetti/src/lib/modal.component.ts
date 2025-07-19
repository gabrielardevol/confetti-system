import {Component, EventEmitter, Output, Input} from '@angular/core';
import { FillersContainerComponent } from '../public-api';
import {NgIf} from '@angular/common';
import {ConfettiBackgroundComponent} from '../public-api';
import {SharedStateService} from './shared-state.service';
import {ConfettiButtonComponent} from '../public-api';

@Component({
  selector: 'confetti-modal',
  standalone: true,
  imports: [FillersContainerComponent, NgIf, ConfettiBackgroundComponent, ConfettiButtonComponent],
  styleUrls: ['utilities.scss'],
  styles: [`
    :host {
      display: block;
    }

    /* Padding personalitzat */
    .p-xl {
      padding: 20px;
    }


    /* Backdrop blur personalitzat */
    .bg-drop-blur {
      backdrop-filter: blur(3px);
    }

    /* Borders */
    .border-t {
      border-top-width: 1px;
    }

    #container {
      background: var(--background-color) ;
      border-style: solid;
    }

  `],
  template: `

    <div class="absolute bg-drop-blur inset-0 flex flex-col justify-center items-center overflow-hidden"
         style="background: color-mix(in srgb, var(--modal-drop-bg) 20%, transparent);
"
         (click)="onCloseClick()">

      <confetti-background style="height: 100%; width: 100%">
        <div class="flex p-xl w-full h-full">
          <div class="flex-1"></div>

          <div class="confetti-content  flex flex-col relative h-full max-h-full  overflow-hidden"
               (click)="$event.stopPropagation()">
            <div class="flex-1"></div>
            <div id="container" class="confetti-border overflow-hidden flex rounded-xl flex-col"
            [style.margin-top]="navbarSize + 'px'">
              <div style="height: 100%; overflow: auto">
                <main class="p-3 flex flex-col flex-1">
                  <h6><ng-content select="[header]"></ng-content>
                    {{header}}</h6>
                  <p  [innerHTML]="body"> <ng-content select="[body]"></ng-content>
                    {{navbarSize}}</p>

                </main>
                <nav style="padding: 8px 16px; gap: 8px; justify-content: end; backdrop-filter: blur(3px);"
                     class="sticky flex bottom-0 w-full border-t bg-opacity bg-drop-blur">
                  <confetti-button [dark]="false" *ngIf="closeButton" (click)="onCloseClick()">
                    {{ closeButton }}
                  </confetti-button>
                  <confetti-button *ngIf="actionButton" (click)="onActionClick()">
                    {{ actionButton }}
                  </confetti-button>
                </nav>
              </div>

            </div>
            <div class="flex-1"></div>

          </div>

          <div class="flex-1"></div>
        </div>
      </confetti-background>




      <div class="flex-1"></div>

    </div>
  `,

})
export class ModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() action = new EventEmitter<void>();

  header: string = '';
  body: string= '';

  closeButton: string = '';
  actionButton: string = ''
  navbarSize: any = 0;

  constructor(private sharedState: SharedStateService) {}
  ngOnInit() {
    this.sharedState.navbarSize$.subscribe(value => {
      this.navbarSize = value;
    });
    this.sharedState.toggleModal(true);
  }

  ngOnDestroy() {
    console.log("destroying modal")
    this.sharedState.toggleModal(false);
  }

  onCloseClick() {
    console.log("onCloseClick")
    this.close.emit(); // Notifica que s'ha de tancar
  }
  onActionClick() {
    console.log("onActionClick")
    this.action.emit(); // Notifica que s'ha de tancar
  }


}
