import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  itemId!: number;
  selectedItem: any;
  items = [
    { id: 1, name: 'Interpolation', description: 'a mathematical method used to estimate unknown values that fall within the range of a discrete set of known data points.' },
    { id: 2, name: 'Event Binding', description: 'connects user actions—such as clicks, keystrokes, or mouse movements—to component methods.' },

  ];
  constructor(private route: ActivatedRoute, private itemService: ItemService) { }
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.selectedItem = this.itemService.getItemById(id);
  }
}