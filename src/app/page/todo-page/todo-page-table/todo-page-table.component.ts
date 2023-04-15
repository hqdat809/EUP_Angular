import { Component, Input, OnInit } from '@angular/core';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TTodo } from 'src/app/interface/global';
import {
  loadTodo,
  setStateTodo,
  updateTodo,
} from 'src/app/store/actions/todo.actions';
import { TodoState } from 'src/app/store/reducers/todo.reducer';

@Component({
  selector: 'app-todo-page-table',
  templateUrl: './todo-page-table.component.html',
  styleUrls: ['./todo-page-table.component.scss'],
})
export class TodoPageTableComponent implements OnInit {
  @Input() openModalDelete: (id: string) => void;
  todoList: TTodo[] | undefined;
  editTodoId: string | undefined;
  editTodoInfo: TTodo;

  constructor(private store: Store<TodoState>) {
    this.store
      .select((state) => {
        return state;
      })
      .subscribe((result: any) => {
        if (result.todoState.filteredTodos.length) {
          this.todoList = result.todoState.filteredTodos;
        } else {
          this.todoList = result.todoState.todos;
        }
      });
    this.openModalDelete = (id: string) => {};
    this.editTodoInfo = {
      id: '',
      name: '',
      time: '',
      state: false,
    };
  }

  ngOnInit(): void {}

  onClickCheckBox(todoId: string, event: any) {
    this.store.dispatch(
      setStateTodo({ id: todoId, stateTodo: event.target.checked })
    );
  }

  onClickEditCancel() {
    this.editTodoId = undefined;
  }

  onClickEditDone() {
    console.log('editInfo: ', this.editTodoInfo);
    this.store.dispatch(updateTodo({ todo: this.editTodoInfo }));
    this.editTodoId = undefined;
  }

  onClickEditBtn(id: string) {
    this.editTodoId = id;
    this.editTodoInfo = {
      id: this.editTodoId || '',
      name:
        this.todoList?.find((todo: TTodo) => todo.id === this.editTodoId)
          ?.name || '',
      time:
        this.todoList?.find((todo: TTodo) => todo.id === this.editTodoId)
          ?.time || '',
      state:
        this.todoList?.find((todo: TTodo) => todo.id === this.editTodoId)
          ?.state || false,
    };
  }
}
