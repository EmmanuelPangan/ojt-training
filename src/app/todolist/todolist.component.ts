import { Component, OnInit } from '@angular/core';
interface Todo {
  text: string;
  completed: boolean;
}
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  newTask = '';
  editTaskText = '';
  editIndex: number | null = null;
  filter: 'all' | 'active' | 'completed' = 'all';
  todos: Todo[] = [];

  addTask() {
    if (this.newTask.trim()) {
      this.todos.push({ text: this.newTask, completed: false });
      this.newTask = '';
      this.saveTodos();
      alert(`Added successfully!\n`);
    }
  }

  deleteTask(index: number) {
    this.todos.splice(index, 1);
    this.saveTodos();
  }

  toggleComplete(todo: any) {
    todo.completed = !todo.completed;
    this.saveTodos();
  }
  startEdit(index: number) {
    this.editIndex = index;
    this.editTaskText = this.todos[index].text;
  }

  saveEdit() {
    if (this.editIndex !== null && this.editTaskText.trim()) {
      this.todos[this.editIndex].text = this.editTaskText;
      this.cancelEdit();
      this.saveTodos();

    }
  }

  setFilter(value: 'all' | 'active' | 'completed') {
    this.filter = value;
  }

  cancelEdit() {
    this.editIndex = null;
    this.editTaskText = '';
  }
  get filteredTodos() {
    if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    }
    if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }
    return this.todos;
  }
  ngOnInit() {
    this.loadTodos();
  }
  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));

  }
  loadTodos() {
    const data = localStorage.getItem('todos');
    if (data) {
      this.todos = JSON.parse(data);
    }

  }
}
