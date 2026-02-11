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

  activeTab: 'add' | 'edit' | 'delete' = 'add';


  addForm!: FormGroup;
  editForm!: FormGroup;
  deleteForm!: FormGroup;

  orders: Orders[] = [];

  private currentDeleteToast: ActiveToast<any> | null = null;

  constructor(private fb: FormBuilder, private orderService: OrdersService, private router: Router
    , private route: ActivatedRoute, private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  this.initForms();

  this.orders = this.orderService.getOrders();
  this.orderService.orders$.subscribe(orders => this.orders = orders);

  this.route.queryParams.subscribe(params => {
    const tab = params['tab'];
    if (tab === 'add' || tab === 'edit' || tab === 'delete') {
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

  switchTab(tab: 'add' | 'edit' | 'delete') {
  this.activeTab = tab;
  this.router.navigate(['/orders'], {
    queryParams: { tab }
  });
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
