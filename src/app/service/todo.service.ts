import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TTodo } from '../interface/global';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoListSubject = new BehaviorSubject([]);

  constructor() {}

  getTodoList() {
    return this.todoListSubject.asObservable();
  }

  addTodoList(todo: TTodo) {
    const newTodoList = [...this.todoListSubject.getValue(), todo];
  }
}
