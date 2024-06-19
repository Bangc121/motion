import { BaseComponent } from "../../base.js";

export class NoteComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, body: string) {
    super(`<section class="note">
            <h1 class="note__title"></h1>
            <p class="page-item__title note__body"></p>
            </section>`);

    const titleElement = this.element.querySelector(
      ".note__title"
    )! as HTMLHeadingElement;
    titleElement.textContent = title;

    const bodyElement = this.element.querySelector(
      ".note__body"
    )! as HTMLParagraphElement;
    bodyElement.textContent = body;
  }
}
