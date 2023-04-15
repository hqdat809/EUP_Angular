import { filterTodo } from './../actions/todo.actions';
import { ETodoFilterType, TTodo } from 'src/app/model/todo.model';
import * as todoActions from '../actions/todo.actions';
import { createReducer, on } from '@ngrx/store';

export interface TodoState {
  todos: TTodo[];
  filteredTodos: TTodo[];
}

const initialState: TodoState = {
  todos: [],
  filteredTodos: [],
};

export const todoReducer = createReducer(
  initialState,
  on(todoActions.loadTodo, (state) => {
    // Handle call api or get state from local storage
    if (localStorage.getItem('todoList')) {
      const todoList = JSON.parse(localStorage.getItem('todoList') || '{}');
      console.log('dispatch load...', todoList);
      return { ...state, todos: todoList };
    }
    return { ...state, todos: [] };
  }),
  on(todoActions.addTodo, (state, { todo }) => {
    const newTodoList = [...state.todos, todo];
    localStorage.setItem('todoList', JSON.stringify(newTodoList));
    console.log('dispatch add... ', newTodoList);
    return {
      ...state,
      todos: newTodoList,
    };
  }),
  on(todoActions.updateTodo, (state, { todo }) => {
    const newTodoList = state.todos.map((item: TTodo) => {
      if (item.id === todo.id) {
        return todo;
      }
      return item;
    });
    console.log('dispatch update...: ', newTodoList);
    localStorage.setItem('todoList', JSON.stringify(newTodoList));
    return {
      ...state,
      todos: newTodoList,
    };
  }),
  on(todoActions.removeTodo, (state, { id }) => {
    const newTodoList = state.todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todoList', JSON.stringify(newTodoList));
    console.log('dispatch remove...: ', newTodoList);
    return {
      ...state,
      todos: newTodoList,
    };
  }),
  on(todoActions.setStateTodo, (state, { id, stateTodo }) => {
    const newTodoList = state.todos.map((todo: TTodo) => {
      if (todo.id === id) {
        return { ...todo, state: stateTodo };
      }
      return todo;
    });
    localStorage.setItem('todoList', JSON.stringify(newTodoList));
    console.log('dispatch set state...', newTodoList);
    return {
      ...state,
      todos: newTodoList,
    };
  }),
  on(todoActions.filterTodo, (state, { filter }) => {
    switch (filter) {
      case ETodoFilterType.ALL:
        return {
          ...state,
          filteredTodos: state.todos,
        };
      case ETodoFilterType.DONE: {
        const newFilterTodos = state.todos.filter((todo: TTodo) => todo.state);
        return {
          ...state,
          filteredTodos: newFilterTodos,
        };
      }
      case ETodoFilterType.DOING: {
        const newFilterTodos = state.todos.filter((todo: TTodo) => !todo.state);
        return {
          ...state,
          filteredTodos: newFilterTodos,
        };
      }
      default:
        return {
          ...state,
        };
    }
  })
);
