import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from 'src/app/store/reducers/todo.reducer';
import { TodoPageModalComponent } from './todo-page-modal/todo-page-modal.component';
import { TodoPageTableComponent } from './todo-page-table/todo-page-table.component';
import { TodoPageComponent } from './todo-page.component';

export const routes: Routes = [
  {
    path: '',
    component: TodoPageComponent,
  },
];

@NgModule({
  declarations: [
    TodoPageComponent,
    TodoPageTableComponent,
    TodoPageModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forRoot({ todoState: todoReducer }),
  ],
})
export class TodoPageModule {}
