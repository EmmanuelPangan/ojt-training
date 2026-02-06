import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';


@Component({
  selector: 'app-listcomponent',
  templateUrl: './listcomponent.component.html',
  styleUrls: ['./listcomponent.component.css']
})
export class ListcomponentComponent {
  items: any;
  private item = [
    {
      id: 1,
      name: 'Interpolation',
      description: 'A mathematical method used to estimate unknown values.'
    },
    {
      id: 2,
      name: 'Data Binding',
      description: 'A technique to synchronize data between model and view.'
    }
  ];
  constructor(
    private itemService: ItemService,
    private router: Router
  ) { }

  selectItem(item: any) {
    this.items = item;
  }
  ngOnInit() {
    this.items = this.itemService.getItems();
  }

  viewDetail(id: number) {
    this.router.navigate(['/detail', id]);
  }

}

