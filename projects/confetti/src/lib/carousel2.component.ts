import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'confetti-carousel2',
  standalone: true,
  styleUrls: ['utilities.scss'],
  styles: [`
    :host {
      display: block;
      width: 100%;
      overflow: auto;
    }

    .carousel div {
      transition: flex 0.8s ease;
      flex: 1;
      /*border-radius: 10000px;*/
      overflow: hidden
    }

    .carousel div:hover {
      flex: 2.5;
    }

  `],
  template: `
    <div class="flex carousel opacity-0" style="aspect-ratio: 4 / 1; width: 100%; margin: auto; overflow: hidden; gap: 1px">
      <div *ngFor="let img of dummyImgUrls, let i = index">
        <img  [src]="img" class="carousel-img" id="{{'carouselImg' + i}}"
             style="height: 100%; width: 100%;  object-fit: cover; flex: 1" alt="">
      </div>

    </div>

    <button (click)="nextImg()">
      next
    </button>
    <button (click)="prevImg()">
      prev
    </button>
  `,
  imports: [
    NgForOf
  ],

})
export class ConfettiCarousel2Component {

  dummyImgs: object[] = []

  currentImgIndex = 0;
  dummyImgUrls = [
    // 'https://www.naturaki.com/fotografies/s/51292casas-rurales-porrera-ok.jpg',
    'https://vadevi.elmon.cat/app/uploads/sites/18/2024/02/porrera-800x350.webp',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8wd_IossqhBcpqjUKOvStd-U57NSM3sdlZg&s',
    'https://media.gettyimages.com/id/171853695/photo/vista-a%C3%A9rea-de-porrera-priorat-catalu%C3%B1a.jpg?s=1024x1024&w=gi&k=20&c=sbD9tefgNQ7wI8F-uhd8tMdxyn1wVR6NkPZGPUqe5hg=',
    'https://i0.wp.com/www.rafaelboix.com/wp-content/uploads/2022/03/Rafael-Boix-Porrera0123.jpg?resize=1920%2C480&ssl=1',
  ];
  private loadedImgs: number = 0;

  async ngAfterViewInit() {

  }

  replaceWithContainer(img: HTMLImageElement, index: number) {


  }

  nextImg() {

  }

  prevImg() {
  }
}
