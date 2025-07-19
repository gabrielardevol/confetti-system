import {Component, ElementRef, Input, Output, ViewChild} from '@angular/core';
import {NgClass} from '@angular/common';
import {SharedStateService} from './shared-state.service';
import {FillersContainerComponent} from '../public-api';

@Component({
  selector: 'confetti-layout-2',
  styleUrls: ['utilities.scss'],
  styles: [`
    main {
      transition: margin-left 0.3s ease;
    }

    aside {
    }

    aside div:first-child {
      width: 200px;
      background: white;
    }

    @media (max-width: 767px) {
      main {
        margin-left: 0;
      }

      aside {
        position: absolute;
        margin-right: 200px;
      }

      aside:not(.menu-hidden) > div:first-child > div:first-child {
        left: 0 !important;
        transition: left 0.3s ease;
      }

      aside.menu-hidden > div:first-child > div:first-child {
        left: -200px !important;
        transition: left 0.5s ease;
      }
    }

    @media (min-width: 768px) {
      main {
        margin-left: 200px;
      }

      aside {
        position: sticky;
        top: 0;
      }
    }

  `],

  template: `
    <div class="h-screen w-screen flex flex-col relative overflow-x-hidden">
      <nav class="h-0 overflow-visible sticky top-0 w-full z-10">
        <div class="bg-white border-b" #navElement>
          <ng-content select="[nav]"></ng-content>
        </div>
      </nav>

      <aside class="border-r sticky overflow-visible top-0 h-0 z-10" [ngClass]="menu ? '' : 'menu-hidden'" style="">
        <div
          [style.margin-top]="navbarSize + 'px'" class="relative">
          <div [style.height]="'calc(100vh - '+navbarSize + 'px'"
               class="absolute top-0 left-0 border-r overflow-x-auto ">
            <ng-content select="[sidebar]"></ng-content>
          </div>
        </div>
      </aside>
      <main [style.padding-top]="navbarSize + 'px'" class="flex-1 box-border min-h-screen flex flex-col relative">
        <div class="flex-1">
          <ng-content select="[content]"></ng-content>
        </div>
      </main>
    </div>
  `,
  imports: [
    NgClass,
    FillersContainerComponent,
  ],
})
export class ConfettiLayout2 {
  @ViewChild('navElement', { static: true }) navRef!: ElementRef<HTMLElement>;
  @Input() menu: boolean = false;
  navbarSize: number | any = 0;
  modal: boolean | any = false;

  constructor(private sharedState: SharedStateService) {
  }

  ngAfterViewInit(){
    this.sharedState.navbarSize$.subscribe(value => {
      this.navbarSize = value;
    });
    this.sharedState.modal$.subscribe(value => {
      this.modal = value;
    });
    // this.navbarSize = this.navRef.nativeElement.offsetHeight;
    this.sharedState.updateNavbarSize(this.navRef.nativeElement.offsetHeight);
    console.log(this.navbarSize)
  }
}
