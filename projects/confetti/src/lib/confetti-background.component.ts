import {Component, ElementRef, HostListener, ViewChild, AfterViewInit, Input} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'confetti-background',
  standalone: true,
  imports: [NgIf],
  styleUrls: ['./utilities.scss'],
  template: `
    <div #confettiContainer style="width: 100%; height: 100%; color: inherit">
      <div class="confetti-background-container">
        <svg #svgContainer
             [attr.height]="height"
             class="confetti-background"
             style="display: block; width: 100%">
        </svg>
      </div>

      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
      color: inherit;
      overflow: hidden;
    }

    .confetti-background-container {
      height: 0;
    }
  `]
})
export class ConfettiBackgroundComponent {
  @ViewChild('confettiContainer', { static: false }) confettiContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('svgContainer', { static: false }) svgContainer!: ElementRef<SVGSVGElement>;
  @Input() density: number = 18;

  width: number = 0;
  height: number = 0;

  colors: string[] = ['var(--confetti-primary)', 'var(--confetti-secondary)','var(--confetti-tertiary)','var(--confetti-quaternary)',];
  numVertices: number = 4;
  minRadius: number = 0;
  maxRadius: number = 4;

  ngAfterViewChecked() {
    this.renderConfetti();
  }

  @HostListener('window:resize')
  renderConfetti() {
    console.log("resizing")
    console.log(this.width)

    if (!this.confettiContainer || !this.svgContainer) return;

    const svgEl = this.svgContainer.nativeElement;

    while (svgEl.firstChild) {
      svgEl.removeChild(svgEl.firstChild);
    }

    this.width = this.confettiContainer.nativeElement.offsetWidth;
    this.height = this.confettiContainer.nativeElement.offsetHeight;

    const quantity = Math.round((this.width * this.height * this.density) / (100 * 100));


    svgEl.setAttribute('width', this.width.toString());
    svgEl.setAttribute('height', this.height.toString());

    const svgNS = "http://www.w3.org/2000/svg";


    for (let i = 0; i < quantity; i++) {
      const centerX = Math.random() * this.width;
      const centerY = Math.random() * this.height;

      const points: string[] = [];
      let currentAngle = Math.random() * 2 * Math.PI;

      for (let j = 0; j < this.numVertices; j++) {
        const radius = this.minRadius + Math.random() * (this.maxRadius - this.minRadius);
        const x = centerX + radius * Math.cos(currentAngle);
        const y = centerY + radius * Math.sin(currentAngle);
        points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
        currentAngle += (Math.PI * 2) / this.numVertices + (Math.random() - 0.5) * 0.5; // afegeix irregularitat a l’angle
      }

      const polygon = document.createElementNS(svgNS, 'polygon');
      polygon.setAttribute('points', points.join(' '));
      polygon.setAttribute('fill', this.colors[Math.floor(Math.random() * this.colors.length)]);

      svgEl.appendChild(polygon);
    }

  }
}
