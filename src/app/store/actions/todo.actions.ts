import { createAction, props } from '@ngrx/store';
import { ETodoFilterType, TTodo } from 'src/app/model/todo.model';

export const loadTodo = createAction('[Todo] Load');
export const addTodo = createAction('[Todo] Add', props<{ todo: TTodo }>());
export const updateTodo = createAction(
  '[Todo] Update',
  props<{ todo: TTodo }>()
);
export const removeTodo = createAction(
  '[Todo] Remove',
  props<{ id: string }>()
);
export const setStateTodo = createAction(
  '[Todo] Set State',
  props<{ id: string; stateTodo: boolean }>()
);
export const filterTodo = createAction(
  '[Todo] Filter',
  props<{ filter: ETodoFilterType }>()
);
