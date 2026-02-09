import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  addForm!: FormGroup;

  constructor(private fb: FormBuilder, private orderService: OrdersService) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      orderName: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  onSubmit()
  {
    const newOrder = 
    {
      id : Date.now(),
      ...this.addForm.value
    };

    this.orderService.addOrder(newOrder);
    console.log(newOrder);
    alert('Order Added!');
    this.addForm.reset();
  }

  
  
}