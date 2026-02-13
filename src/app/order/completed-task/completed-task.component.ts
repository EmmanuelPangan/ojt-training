import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Orders } from '../orders.model';

@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.component.html',
  styleUrls: ['./completed-task.component.css']
})
export class CompletedTaskComponent implements OnInit {
  @Input() completedOrders: Orders[] = [];
  @Output() markActive = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onMarkActive(id: number): void {
    this.markActive.emit(id);
  }

}
