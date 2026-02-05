import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {
  private subject = new Subject<string>();
  message$ = this.subject.asObservable();

  error(message: string) {
    this.subject.next(message);
  }

  clear()
  {
    this.subject.next();
  }

  constructor() { }
}
