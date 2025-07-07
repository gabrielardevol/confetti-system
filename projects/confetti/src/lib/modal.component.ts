import {Component, EventEmitter, Output, Input} from '@angular/core';
import { FillersContainerComponent } from './fillers-container.component';
import {NgIf} from '@angular/common';
import {ConfettiBackgroundComponent} from './confetti-background.component';
import {SharedStateService} from './shared-state.service';

@Component({
  selector: 'confetti-modal',
  standalone: true,
  imports: [FillersContainerComponent, NgIf, ConfettiBackgroundComponent],
  styleUrls: ['utilities.scss'],
  styles: [`
    :host {
      display: block;
    }

    /* Padding personalitzat */
    .p-xl {
      padding: 20px;
    }

    /* Opacitat personalitzada */
    .bg-opacity {
      background-color: rgba(255, 255, 255, 0.29);
    }


    /* Backdrop blur personalitzat */
    .bg-drop-blur {
      backdrop-filter: blur(6px);
    }

    /* Borders */
    .border-t {
      border-top-width: 1px;
    }

    .border-black {
      border-color: black;
    }

  `],
  template: `

    <div class="absolute inset-0 flex flex-col justify-center items-center  bg-drop-blur  bg-opacity overflow-hidden"
         (click)="onCloseClick()">

      <confetti-background style="height: 100%; width: 100%">
        <div class="flex p-xl w-full h-full">
          <div class="flex-1"></div>

          <div class="confetti-content  flex flex-col relative h-full max-h-full  overflow-hidden"
               (click)="$event.stopPropagation()">
            <div class="flex-1"></div>
            <div class="overflow-auto border border-black flex bg-white rounded-xl flex-col"
            [style.margin-top]="navbarSize + 'px'">
              <main class="p-3 flex flex-col flex-1">
                <h2><ng-content select="[header]"></ng-content>
                  {{header}}</h2>
                <p> <ng-content select="[body]"></ng-content>
                  {{body}}
                {{navbarSize}}</p>

              </main>
              <nav style="padding: 8px 16px;"
                   class="sticky bottom-0 w-full border-t border-black bg-white bg-opacity">
                <button *ngIf="closeButton" (click)="onCloseClick()">
                  {{ closeButton }}
                </button>
                <button *ngIf="actionButton" (click)="onActionClick()">
                  {{ actionButton }}
                </button>
              </nav>
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
