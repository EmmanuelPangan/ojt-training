import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html'
})
export class EditTaskComponent implements OnInit {

  editForm!: FormGroup;

  constructor(private fb: FormBuilder, private orderService: OrdersService) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      orderName: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  onSubmit() {
    this.orderService.updateOrder(this.editForm.value);
    console.log(this.editForm.value);
    alert('Order Updated!');
  }
}