import { Component } from '@angular/core';
import { ItemService } from '../item.service';


@Component({
  selector: 'app-listcomponent',
  templateUrl: './listcomponent.component.html',
  styleUrls: ['./listcomponent.component.css']
})
export class ListcomponentComponent {
  items: any[] = []; 


  constructor(
    private itemService: ItemService
  ) { }



  ngOnInit() {
    this.items = this.itemService.getItems();
  }
  

}

