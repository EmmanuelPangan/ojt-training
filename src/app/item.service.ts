import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private items = [
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
  getItems() {
    return this.items;
  }

  getItemById(id: number) {
    return this.items.find(item => item.id === id);
  }
}
