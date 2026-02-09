import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { Orders } from '../../order/orders.model';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html'
})
export class DeleteTaskComponent implements OnInit {

  deleteForm!: FormGroup;
  orders: Orders[] = [];

  constructor(private fb: FormBuilder, private orderService: OrdersService) {
    this.deleteForm = this.fb.group({
      id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Load current orders
    this.orders = this.orderService.getOrders();

    // Subscribe to live updates
    this.orderService.orders$.subscribe(orders => this.orders = orders);
  }

  onSubmit() {
  const id = Number(this.deleteForm.value.id); // <-- convert to number
  const existingOrder = this.orderService.getOrderById(id);

  if (!existingOrder) {
    alert('Order not found!');
    return;
  }

  if (confirm(`Are you sure you want to delete "${existingOrder.orderName}"?`)) {
    this.orderService.deleteOrder(id);
    this.deleteForm.reset();
    alert('Order Deleted!');
  }
}
}