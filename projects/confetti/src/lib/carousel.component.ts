import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'confetti-carousel',
  standalone: true,
  styleUrls: ['utilities.scss'],
  styles: [`
    :host {
      display: block;
      width: 100%;
      overflow: auto;
    }

    img {
      /*border-radius: 8px;*/
      border-bottom: 1px solid;
      border-right: 1px solid;
      border-left: 1px solid

      /*aspect-ratio: 1/1; object-fit: contain;*/
    }

    .carousel div {
      margin: 4px;
    }

    .carousel-wrapper.hidden {
      margin: 0;
      width: 0;
    }

    .opacity-0 {
      opacity: 0;
    }

  `],
  template: `
    <div class="flex carousel opacity-0" style="height: 30vh; width: fit-content; margin: auto; overflow: hidden;">
      <img *ngFor="let img of dummyImgUrls, let i = index" [src]="img" class="carousel-img" id="{{'carouselImg' + i}}"
           style="height: 100%;" alt="">
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
export class ConfettiCarouselComponent {

  dummyImgs: object[] = []

  currentImgIndex = 0;
  dummyImgUrls = [
    'https://www.naturaki.com/fotografies/s/51292casas-rurales-porrera-ok.jpg',
    'https://vadevi.elmon.cat/app/uploads/sites/18/2024/02/porrera-800x350.webp',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8wd_IossqhBcpqjUKOvStd-U57NSM3sdlZg&s',
    'https://media.gettyimages.com/id/171853695/photo/vista-a%C3%A9rea-de-porrera-priorat-catalu%C3%B1a.jpg?s=1024x1024&w=gi&k=20&c=sbD9tefgNQ7wI8F-uhd8tMdxyn1wVR6NkPZGPUqe5hg=',
    'https://i0.wp.com/www.rafaelboix.com/wp-content/uploads/2022/03/Rafael-Boix-Porrera0123.jpg?resize=1920%2C480&ssl=1',
  ];
  private loadedImgs: number = 0;

  async ngAfterViewInit() {
    let imgs = document.querySelectorAll<HTMLImageElement>('.carousel-img');

    imgs.forEach((img, i) => {
      // Esperem que estigui carregada
      if (!img.complete) {
        img.onload = () => this.replaceWithContainer(img, i);

      } else {
        this.replaceWithContainer(img, i);
      }
    });
  }

  replaceWithContainer(img: HTMLImageElement, index: number) {
    const width = img.clientWidth;
    const height = img.clientHeight;

    // Crear div contenidor
    const wrapper = document.createElement('div');
    wrapper.classList.add('carousel-wrapper');
    wrapper.style.boxSizing = 'border-box';
    wrapper.dataset['width'] = width.toString() ;
    wrapper.dataset['height'] = height.toString();
    wrapper.style.display = 'inline-block';
    wrapper.style.overflow = 'hidden';
    wrapper.style.borderRadius = '1111px';
    wrapper.style.transition = 'margin 0.3s ease, width 0.3s ease';
    if (index > 0) {
      wrapper.style.width = '0px';
    } else {
      wrapper.style.width = width + 'px';

    }

    // Clonar la imatge
    const imgClone = img.cloneNode(true) as HTMLImageElement;
    imgClone.style.opacity = '1';
    wrapper.appendChild(imgClone);

    // Substituir la imatge original pel contenidor
    img.parentNode?.replaceChild(wrapper, img);

    this.loadedImgs += 1;
    console.log("this.loadedImgs" , this.loadedImgs)
    if (this.loadedImgs == this.dummyImgUrls.length) {
      const el = document.querySelector('.carousel');

      if (el) {
        el.classList.remove('opacity-0');
      }
    }

  }

  nextImg() {

    const imgs = document.querySelectorAll('.carousel-wrapper');
    const el0 = imgs[this.currentImgIndex - 1] as HTMLElement;
    if (el0) el0.style.width = '0px';

    const el1 = imgs[this.currentImgIndex] as HTMLElement;
    el1.style.width = (parseInt(el1.dataset['width']  || '0')) / 2 + 'px';

    if (this.currentImgIndex + 1 >= this.dummyImgUrls.length) {
      const el2 = imgs[0] as HTMLElement;
      el2.style.width = parseInt(el2.dataset['width']  || '0') / 2 + 'px';
      this.currentImgIndex = 0;
    } else {
      const el2 = imgs[this.currentImgIndex + 1] as HTMLElement;
      el2.style.width = el2.dataset['width'] || '0';
      const el3 = imgs[this.currentImgIndex + 2] as HTMLElement;
      el2.style.width = parseInt(el2.dataset['width']  || '0') / 2 + 'px';
      this.currentImgIndex += 1;
    }
  }

  prevImg() {
    const imgs = document.querySelectorAll('.carousel-wrapper');
    const el1 = imgs[this.currentImgIndex] as HTMLElement;
    el1.style.width = '0';

    if (this.currentImgIndex == 0) {
      const el2 = imgs[this.dummyImgUrls.length - 1] as HTMLElement;
      el2.style.width = el2.dataset['width'] || '0';
      this.currentImgIndex = this.dummyImgUrls.length - 1;
    } else {
      const el2 = imgs[this.currentImgIndex - 1] as HTMLElement;
      el2.style.width = el2.dataset['width'] || '0';
      this.currentImgIndex -= 1;
    }
  }
}
