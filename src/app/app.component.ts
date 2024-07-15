import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TodosStore} from "./store/todos.store";
import {TodosServices} from "./services/todos.services";
import {TodosListComponent} from "./todos-list/todos-list.component";
import {JsonPipe} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodosListComponent, JsonPipe, MatProgressSpinner],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  store = inject(TodosStore);

  ngOnInit() {
    this.loadTodos()
      .then((todos) => console.log(todos));
  }

  async loadTodos() {
    await this.store.loadAll();
  };
}
