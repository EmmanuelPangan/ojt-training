import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from '../services/orders.service';
import { Orders } from './orders.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService, ActiveToast} from 'ngx-toastr';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  activeTab: 'add' | 'edit' | 'delete' | 'completed' = 'add';


  addForm!: FormGroup;
  editForm!: FormGroup;
  deleteForm!: FormGroup;

  orders: Orders[] = [];
  completedOrderIds: number[] = [];
  orderSearchTerm = '';

  private currentDeleteToast: ActiveToast<any> | null = null;

  constructor(private fb: FormBuilder, private orderService: OrdersService, private router: Router
    , private route: ActivatedRoute, private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  this.initForms();

  this.orders = this.orderService.getOrders();
  this.loadCompletedOrderIds();
  this.orderService.orders$.subscribe(orders => {
    this.orders = orders;
    this.completedOrderIds = this.completedOrderIds.filter(id => this.orders.some(order => order.id === id));
    this.saveCompletedOrderIds();
  });

  this.route.queryParams.subscribe(params => {
    const tab = params['tab'];
    if (tab === 'add' || tab === 'edit' || tab === 'delete' || tab === 'completed') {
      this.activeTab = tab;
    }
  });

  const idControl = this.editForm.get('id');
  if (idControl) {
    idControl.valueChanges.subscribe(id => {
      this.populateEditForm(Number(id));
    });
  }
}

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

  switchTab(tab: 'add' | 'edit' | 'delete' | 'completed') {
  this.activeTab = tab;
  this.router.navigate(['/orders'], {
    queryParams: { tab }
  });
  }

  get completedOrders(): Orders[] {
    return this.orders.filter(order => this.completedOrderIds.includes(order.id));
  }

  get filteredOrders(): Orders[] {
    const term = this.orderSearchTerm.trim().toLowerCase();
    if (!term) {
      return this.orders;
    }

    return this.orders.filter(order =>
      (order.orderName || '').toLowerCase().includes(term)
    );
  }

  isCompleted(id: number): boolean {
    return this.completedOrderIds.includes(id);
  }
  onDeliveredToggle(id: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      this.markCompleted(id);
      return;
    }

    this.markIncomplete(id);
  }
  markCompleted(id: number): void {
    if (!this.completedOrderIds.includes(id)) {
      this.completedOrderIds.push(id);
      this.saveCompletedOrderIds();
      this.toastr.success('Order marked as Delivered!');
    }
  }

  markIncomplete(id: number): void {
    this.completedOrderIds = this.completedOrderIds.filter(orderId => orderId !== id);
    this.saveCompletedOrderIds();
    this.toastr.info('Order moved back to Add Order.');
  }

  private loadCompletedOrderIds(): void {
    const raw = localStorage.getItem('completedOrderIds');
    if (!raw) {
      this.completedOrderIds = [];
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      this.completedOrderIds = Array.isArray(parsed) ? parsed.map(Number).filter(Number.isFinite) : [];
    } catch {
      this.completedOrderIds = [];
    }
  }

  private saveCompletedOrderIds(): void {
    localStorage.setItem('completedOrderIds', JSON.stringify(this.completedOrderIds));
  }

  onAdd() {
    const orders = this.orderService.getOrders();

    const nextId =
      orders.length > 0
        ? Math.max(...orders.map(o => o.id)) + 1
        : 1;

    const newOrder: Orders = {
      id: nextId,
      ...this.addForm.value
    };

    this.orderService.addOrder(newOrder);
    this.addForm.reset();
    this.toastr.success('Order Added!');
  }

  onEdit() {
    const updatedOrder: Orders = this.editForm.value;
    const existingOrder = this.orderService.getOrderById(updatedOrder.id);

    if (!existingOrder) {
      this.toastr.error('Order ID not found!');
      return;
    }

    this.orderService.updateOrder(updatedOrder);
    this.editForm.reset();
    this.toastr.success('Order Updated!');
  }

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

  isEditValid(): boolean {
    const id = this.editForm.value.id;
    return !!this.orderService.getOrderById(id);
  }

onDelete() {
  const id = Number(this.deleteForm.value.id); // Convert to number
  const existingOrder = this.orderService.getOrderById(id);

  if (!existingOrder) {
    this.toastr.error('Order ID not found!');
    return;
  }

  if (confirm(`Are you sure you want to delete "${existingOrder.orderName}"?`)) {
    this.orderService.deleteOrder(id); // Call service to delete
    this.completedOrderIds = this.completedOrderIds.filter(orderId => orderId !== id);
    this.saveCompletedOrderIds();
    this.deleteForm.reset();           // Reset dropdown
    this.toastr.success('Order Deleted!');
  }
}


isDeleteValid(): boolean {
  const id = Number(this.deleteForm.value.id); 
  return !!this.orderService.getOrderById(id);
}


selectOrderForDelete(id: number) {
  this.deleteForm.patchValue({ id }); 
}

selectOrderForEdit(order: any) {
  if (this.editForm) {
    this.editForm.patchValue({
      id: order.id,
      orderName: order.orderName,
      quantity: order.quantity,
      price: order.price
    });
  }
}


}
