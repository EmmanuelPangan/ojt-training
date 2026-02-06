import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  itemId!: number;
  name = '';
  description = '';
  item: any;
  items = [
    { id: 1, name: 'Interpolation', description: 'a mathematical method used to estimate unknown values that fall within the range of a discrete set of known data points.' },
    { id: 2, name: 'Event Binding', description: 'connects user actions—such as clicks, keystrokes, or mouse movements—to component methods.' },

  ];
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.itemId = Number(this.route.snapshot.paramMap.get('id'));

    const item = this.items.find(i => i.id === this.itemId);
    if (item) {
      this.name = item.name;
      this.description = item.description;
    } else {
      this.name = 'Item not found';
      this.description = '';
    }
  }
}