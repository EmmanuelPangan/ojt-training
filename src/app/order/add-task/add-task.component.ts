import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  addForm!: FormGroup;

  constructor(private fb: FormBuilder, private orderService: OrdersService) {}

  noNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      return /\d/.test(value) ? { hasNumber: true } : null;
    };
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      orderName: ['', [Validators.required, this.noNumberValidator()]],
      quantity: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  onSubmit() {
  if (this.addForm.invalid) {
    this.addForm.markAllAsTouched();
    return;
  }
  
  const orders = this.orderService.getOrders();

  // Determine the next chronological ID
  const nextId = orders.length > 0 
    ? Math.max(...orders.map(o => o.id)) + 1  
    : 1;                                     

  const newOrder = {
    id: nextId,
    ...this.addForm.value
  };

  this.orderService.addOrder(newOrder);
  console.log(newOrder);
  alert('Order Added!');
  this.addForm.reset();
}

  
  
}
