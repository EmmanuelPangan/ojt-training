import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html'
})
export class DeleteTaskComponent {

  deleteForm!: FormGroup;

  constructor(private fb: FormBuilder, private orderService : OrdersService) {
    this.deleteForm = this.fb.group({
      id: ['', Validators.required]
    });
  }

  onSubmit() {
    this.orderService.deleteOrder(this.deleteForm.value.id);
    console.log(this.deleteForm.value);
    alert('Order Deleted!');
  }
}