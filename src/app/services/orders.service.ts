import { Injectable } from '@angular/core';
import { Orders } from '../order/orders.model'; 
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private storageKey = 'orders';
  
  // Initialize with existing orders from localStorage
  private orderSource = new BehaviorSubject<Orders[]>(this.getOrders());
  orders$ = this.orderSource.asObservable();

  constructor() { }

  getOrders(): Orders[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private saveOrders(orders: Orders[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(orders));
    this.orderSource.next(orders); // Notify subscribers of change
  }

  addOrder(order: Orders): void {
    const orders = this.getOrders();
    orders.push(order);
    this.saveOrders(orders); // update localStorage + emit new list
  }

  updateOrder(updatedOrder: Orders): void {
    const orders = this.getOrders().map(o => o.id === updatedOrder.id ? updatedOrder : o);
    this.saveOrders(orders);
  }

  deleteOrder(id: number): void {
    const orders = this.getOrders().filter(o => o.id !== id);
    this.saveOrders(orders);
  }

  getOrderById(id: number): Orders | undefined {
    const orders = this.getOrders();
    return orders.find(o => o.id === id);
  }
}