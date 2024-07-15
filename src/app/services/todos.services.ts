import {Injectable} from "@angular/core";
import {TODOS} from "../model/mock-data";
import {Todo} from "../model/todo.model";

@Injectable(
  { providedIn: 'root' }
)
export class TodosServices {
  async getTodos(): Promise<Todo[]> {
    await this.sleep(1000);
    return TODOS;
  };

  async addToDo(todo: Partial<Todo>) {
    await this.sleep(200);
    return {
      id: TODOS.length + 1,
      ...todo,
    } as Todo;
  }

  async deleteTodo(id: number) {
    await this.sleep(200);
  }

  async updateTodo(todo: Todo, completed: boolean) {
    await this.sleep(200);
  }

  async sleep(delay: number) {
    return new Promise(resolve => setTimeout(resolve, delay));
  }
}
