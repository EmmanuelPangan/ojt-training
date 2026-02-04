import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private dataSource = new BehaviorSubject<string>('');
  data$ = this.dataSource.asObservable();

  setData(value: string) : void
  {
    this.dataSource.next(value);
  }

  constructor() { }
}
