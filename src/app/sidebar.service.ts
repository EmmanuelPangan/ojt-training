// sidebar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private isClosedSubject = new BehaviorSubject<boolean>(true);

  isClosed$ = this.isClosedSubject.asObservable();

  toggle() {
    this.isClosedSubject.next(!this.isClosedSubject.value);
  }

  open() {
    this.isClosedSubject.next(false);
  }

  close() {
    this.isClosedSubject.next(true);
  }
}
