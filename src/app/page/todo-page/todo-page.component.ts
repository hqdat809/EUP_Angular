import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ETodoModalType, TTodo } from 'src/app/model/todo.model';
import {
  addTodo,
  filterTodo,
  loadTodo,
  removeTodo,
  updateTodo,
} from 'src/app/store/actions/todo.actions';
import { TodoState } from './../../store/reducers/todo.reducer';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent implements OnInit {
  todos: TTodo[] | undefined;
  modalType: ETodoModalType = ETodoModalType.ADD_MODAL;
  todoDeleteId: string | undefined;

  @ViewChild('todoModal') todoModal!: ElementRef<HTMLElement>;

  constructor(private store: Store<TodoState>, private modalService: NgbModal) {
    this.store
      .select((state) => {
        return state;
      })
      .subscribe((result: any) => {
        this.todos = result.todoState.todos;
      });
  }

  ngOnInit(): void {
    this.store.dispatch(loadTodo());
  }

  ngAfterViewInit() {}

  onChangeFilter(filter: any) {
    this.store.dispatch(filterTodo({ filter: filter.target.value }));
  }

  onDelete() {
    this.todoDeleteId &&
      this.store.dispatch(removeTodo({ id: this.todoDeleteId }));
    this.closeModal();
  }

  onClickAddBtn = () => {
    this.modalType = ETodoModalType.ADD_MODAL;
    this.openModal();
  };

  openModal = () => {
    this.modalService.open(this.todoModal);
  };

  closeModal = () => {
    this.modalService.dismissAll();
  };

  openModalDelete = (id: string) => {
    this.todoDeleteId = id;
    this.modalService.open(this.todoModal);
    this.modalType = ETodoModalType.DELETE_MODAL;
  };
}
