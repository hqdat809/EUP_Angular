import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ETodoModalType } from 'src/app/model/todo.model';
import { addTodo } from 'src/app/store/actions/todo.actions';
import { TodoState } from 'src/app/store/reducers/todo.reducer';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-todo-page-modal',
  templateUrl: './todo-page-modal.component.html',
  styleUrls: ['./todo-page-modal.component.scss'],
})
export class TodoPageModalComponent {
  addTodoForm: FormGroup;
  @Input() closeModal: () => void;
  @Input() modalType: ETodoModalType = ETodoModalType.ADD_MODAL;
  @Output() handleDeleteTodo = new EventEmitter<number>();

  constructor(private fb: FormBuilder, private store: Store<TodoState>) {
    this.addTodoForm = this.fb.group({
      name: ['', Validators.required],
      time: ['', [Validators.required]],
      state: [, []],
    });
    this.closeModal = () => {};
  }

  handleDelete() {
    this.handleDeleteTodo.emit();
  }

  onSubmit() {
    console.log(this.addTodoForm.value);
    if (this.addTodoForm.valid) {
      this.store.dispatch(
        addTodo({
          todo: { ...this.addTodoForm.value, id: uuidv4() },
        })
      );
      this.closeModal();
    }
  }
}
