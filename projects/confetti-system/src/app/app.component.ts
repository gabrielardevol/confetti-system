import {Component, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ModalComponent, FillersContainerComponent, ConfettiBackgroundComponent, ConfettiLayout, ConfettiButtonComponent} from 'confetti';
@Component({
  selector: 'app-root',
  imports: [FillersContainerComponent, ConfettiBackgroundComponent, ModalComponent, ConfettiLayout, ConfettiButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'confetti-system';
  @ViewChild('modalContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  modalRef?: ComponentRef<ModalComponent>;
  menu: boolean = false;

  openModal() {
    this.container.clear(); // Neteja si ja n’hi ha un
    // console.log(this.container.element.nativeElement)
    // this.container.element.nativeElement.style.position= 'relative';
    this.modalRef = this.container.createComponent(ModalComponent);
    this.modalRef.instance.header = "Header";
    this.modalRef.instance.body = "Body";

    this.modalRef.instance.closeButton = 'stringg';
    this.modalRef.instance.actionButton = 'action';
    console.log(this.modalRef)
    //
    this.modalRef.instance.close.subscribe(() => {
      this.modalRef?.destroy(); // Destrueix el component modal
    });
  }
}
