import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from '../services/orders.service';
import { Orders } from './orders.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  // Current active tab: add | edit | delete
  activeTab: 'add' | 'edit' | 'delete' = 'add';

  // Reactive Forms
  addForm!: FormGroup;
  editForm!: FormGroup;
  deleteForm!: FormGroup;

  orders: Orders[] = [];

  constructor(private fb: FormBuilder, private orderService: OrdersService) { }

  ngOnInit(): void {
    this.initForms();

    // Load initial orders
    this.orders = this.orderService.getOrders();

    // Subscribe to BehaviorSubject for live updates
    this.orderService.orders$.subscribe(orders => this.orders = orders);

    // Auto-fill Edit form when ID changes
    const idControl = this.editForm.get('id');
    if (idControl) {
      idControl.valueChanges.subscribe((id: any) => {
        this.populateEditForm(Number(id));
      });
    }
  }

  // Initialize forms
  initForms() {
    this.addForm = this.fb.group({
      orderName: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.editForm = this.fb.group({
      id: ['', Validators.required],
      orderName: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.deleteForm = this.fb.group({
      id: ['', Validators.required]
    });
  }

  // Switch tabs
  switchTab(tab: 'add' | 'edit' | 'delete') {
    this.activeTab = tab;
  }

  // --- Add ---
  onAdd() {
    const newOrder: Orders = {
      id: Date.now(),
      ...this.addForm.value
    };
    this.orderService.addOrder(newOrder);
    this.addForm.reset();
    alert('Order Added!');
  }

  // --- Edit ---
  onEdit() {
    const updatedOrder: Orders = this.editForm.value;
    const existingOrder = this.orderService.getOrderById(updatedOrder.id);

    if (!existingOrder) {
      alert('Order ID not found!');
      return;
    }

    this.orderService.updateOrder(updatedOrder);
    this.editForm.reset();
    alert('Order Updated!');
  }

  // Auto-fill Edit form
  populateEditForm(id: number) {
    const order = this.orderService.getOrderById(id);
    if (order) {
      this.editForm.patchValue({
        orderName: order.orderName,
        quantity: order.quantity,
        price: order.price
      });
    } else {
      this.editForm.patchValue({
        orderName: '',
        quantity: '',
        price: ''
      });
    }
  }

  // Check if Edit form ID is valid
  isEditValid(): boolean {
    const id = this.editForm.value.id;
    return !!this.orderService.getOrderById(id);
  }

  // --- Delete ---
  onDelete() {
    const id = this.deleteForm.value.id;
    const existingOrder = this.orderService.getOrderById(id);

    if (!existingOrder) {
      alert('Order ID not found!');
      return;
    }

    if (confirm(`Are you sure you want to delete "${existingOrder.orderName}"?`)) {
      this.orderService.deleteOrder(id);
      this.deleteForm.reset();
      alert('Order Deleted!');
    }
  }

  isDeleteValid(): boolean {
    const id = this.deleteForm.value.id;
    return !!this.orderService.getOrderById(id);
  }
}
