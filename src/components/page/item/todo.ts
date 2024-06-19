import { BaseComponent } from "../../base.js";

export class TodoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, todo: string) {
    super(`<section class="todo">
        <h1 class="page-item__title todo__title"></h1>
        <input type="checkbox" class="todo-checkbox">
        <label for="todo-checkbox" class="todo-label"></label>
    </section>`);

    const titleElement = this.element.querySelector(
      ".todo__title"
    )! as HTMLHeadingElement;
    titleElement.textContent = title;

    const bodyElement = this.element.querySelector(
      ".todo-label"
    )! as HTMLInputElement;
    bodyElement.textContent = todo;
  }
}
