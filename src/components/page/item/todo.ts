import { BaseComponent } from "../../base.js";

export class TodoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, todo: string) {
    super(`<section class="todo">
        <h1 class="todo__title"></h1>
        <input type="checkbox" class="todo-checkbox">
    </section>`);

    const titleElement = this.element.querySelector(
      ".todo__title"
    )! as HTMLHeadingElement;
    titleElement.textContent = title;

    const bodyElement = this.element.querySelector(
      ".todo-checkbox"
    )! as HTMLInputElement;
    bodyElement.insertAdjacentText("afterend", todo);
  }
}
