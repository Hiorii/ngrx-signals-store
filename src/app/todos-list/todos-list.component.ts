import {Component, effect, inject, viewChild} from '@angular/core';
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButtonToggle, MatButtonToggleChange, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatListModule, MatListOption, MatSelectionList} from "@angular/material/list";
import {TodosFilter, TodosStore} from "../store/todos.store";
import {JsonPipe, NgStyle} from "@angular/common";

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatIcon,
    MatSuffix,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatSelectionList,
    MatLabel,
    MatListOption,
    JsonPipe,
    MatListModule,
    NgStyle
  ],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {
  store = inject(TodosStore);
  filter = viewChild.required(MatButtonToggleGroup);

  constructor() {
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    });
  }

  onTodoToggled($event: MatButtonToggleChange) {
    const filter = $event.value as TodosFilter;

    this.store.updateFilter(filter);
  }
}
