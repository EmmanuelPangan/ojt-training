import { Component, OnInit } from '@angular/core';
interface Todo {
  text: string;
  completed: boolean;
  dateStarted: string;
  dateFinish: string;
  status: 'pending' | 'in-progress' | 'completed';
}
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  newTask = '';
  newDateStarted = '';
  newDateFinish = '';
  newStatus: 'pending' | 'in-progress' | 'completed' = 'pending';
  editTaskText = '';
  editDateStarted = '';
  editDateFinish = '';
  editStatus: 'pending' | 'in-progress' | 'completed' = 'pending';
  editIndex: number | null = null;
  filter: 'all' | 'active' | 'completed' = 'all';
  searchLetter: string = '';
  todos: Todo[] = [];

  addTask() {
    if (this.newTask.trim()) {
      this.todos.push({
        text: this.newTask,
        completed: false,
        dateStarted: this.newDateStarted,
        dateFinish: this.newDateFinish,
        status: this.newStatus
      });
      this.newTask = '';
      this.newDateStarted = '';
      this.newDateFinish = '';
      this.newStatus = 'pending';
      this.saveTodos();
      alert(`Task added successfully!`);
    }
  }

  deleteTask(index: number) {
    this.todos.splice(index, 1);
    this.saveTodos();
  }

  toggleComplete(todo: any) {
    todo.completed = !todo.completed;
    todo.status = todo.completed ? 'completed' : todo.status;
    this.saveTodos();
  }

  startEdit(index: number) {
    this.editIndex = index;
    this.editTaskText = this.todos[index].text;
    this.editDateStarted = this.todos[index].dateStarted;
    this.editDateFinish = this.todos[index].dateFinish;
    this.editStatus = this.todos[index].status;
  }

  saveEdit() {
    if (this.editIndex !== null && this.editTaskText.trim()) {
      this.todos[this.editIndex].text = this.editTaskText;
      this.todos[this.editIndex].dateStarted = this.editDateStarted;
      this.todos[this.editIndex].dateFinish = this.editDateFinish;
      this.todos[this.editIndex].status = this.editStatus;
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
    this.editDateStarted = '';
    this.editDateFinish = '';
    this.editStatus = 'pending';
  }

  get filteredTodos() {
    let filtered = this.todos;

    if (this.filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    if (this.searchLetter.trim()) {
      filtered = filtered.filter(todo =>
        todo.text.toLowerCase().startsWith(this.searchLetter.toLowerCase())
      );
    }

    return filtered;
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
