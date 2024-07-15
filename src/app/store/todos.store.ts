import {Todo} from "../model/todo.model";
import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {computed, inject} from "@angular/core";
import {TodosServices} from "../services/todos.services";
import {state} from "@angular/animations";

export type TodosFilter = 'all' | 'completed' | 'pending';

type TodosState = {
  todos: Todo[];
  loading: boolean;
  filter: TodosFilter;
};

const initialState: TodosState = {
  todos: [],
  loading: false,
  filter: 'all'
};

export const TodosStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods(
    (store, todosService = inject(TodosServices)) => ({
      async loadAll() {
        patchState(store, {loading: true});

        const todos = await todosService.getTodos();
        patchState(store, {todos: todos, loading: false});
      },

      async addTodo(title: string) {
        const todo = await todosService.addToDo({title, completed: false});
        patchState(store, (state) => ({
          todos: [...state.todos, todo]
        }));
      },

      async deleteTodo(todo: Todo) {
        await todosService.deleteTodo(todo.id);
        patchState(store, (state) => ({
          todos: state.todos.filter(t => t.id !== todo.id)
        }));
      },

      async updateTodo(todo: Todo, completed: boolean) {
        await todosService.updateTodo(todo, completed);
        patchState(store, (state) => ({
          todos: state.todos.map(t => t.id === todo.id ? {...t, completed} : t)
        }));
      },

      updateFilter(filter: TodosFilter) {
        patchState(store, {filter});
      }
  })
  ),
  withComputed((state) => ({
    filteredTodos: computed(() => {
      const todos = state.todos();

      switch (state.filter()) {
        case 'all':
          return todos;
        case 'pending':
          return todos.filter((t: Todo) => !t.completed);
        case 'completed':
          return todos.filter((t: Todo) => t.completed);
        default:
          return todos;
      }
    })
  }))
);
