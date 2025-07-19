import {Component, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ConfettiBackgroundComponent, ConfettiLayout, FillersContainerComponent} from 'confettti';
import { ModalComponent } from '../../../confetti/src/lib/modal.component';
;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ConfettiLayout,
    FillersContainerComponent,
    ConfettiBackgroundComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'confetti-system';
  @ViewChild('modalContainer', {read: ViewContainerRef}) container!: ViewContainerRef;
  modalRef?: ComponentRef<ModalComponent>;
  menuToggle: boolean = false;
  menu = [
    {
      label: 'Inici',
      link: '/home'
    },
    {
      label: 'Layout',
      children: [
        {label: 'fillers-container', link: '/layout/fillers-container'},
        {label: 'modal', link: '/layout/modal'}
      ]
    },
    {
      label: 'Components',
      children: [
        {label: 'Button', link: '/productes/electronica/mobils'},
        {label: 'Portàtils', link: '/productes/electronica/portatils'}
      ]
    },
    {
      label: 'Productes',
      children: []
    },
    {
      label: 'Contacte',
      link: '/contacte'
    }
  ];

  openModal() {
    this.container.clear(); // Neteja si ja n’hi ha un
    // console.log(this.container.element.nativeElement)
    // this.container.element.nativeElement.style.position= 'relative';
    this.modalRef = this.container.createComponent(ModalComponent);
    this.modalRef.instance.header = "This is a modal";
    this.modalRef.instance.body = "Testing modal component <br> does it work or not?";

    this.modalRef.instance.closeButton = 'stringg';
    this.modalRef.instance.actionButton = 'action';
    console.log(this.modalRef)
    //
    this.modalRef.instance.close.subscribe(() => {
      this.modalRef?.destroy(); // Destrueix el component modal
    });
  }
}
