import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedStateService {
  private navbarSize = new BehaviorSubject<number>(0);
  public navbarSize$ = this.navbarSize.asObservable();

  private modal = new BehaviorSubject<boolean>(false);
  public modal$ = this.modal.asObservable();

  constructor() { }

  updateNavbarSize(size: number) {
    this.navbarSize.next(size);
  }

  toggleModal(state: boolean) {
    this.modal.next(state);
  }
}
