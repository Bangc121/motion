export interface IBaseComponent {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
  removeFrom(parent: HTMLElement): void;
  attach(component: IBaseComponent, position?: InsertPosition): void;
}
/*
 ** encapsulation html element careation
 */
export class BaseComponent<T extends HTMLElement> implements IBaseComponent {
  protected readonly element: T;
  constructor(htmlString: string) {
    const template = document.createElement("template");
    template.innerHTML = htmlString;
    this.element = template.content.firstElementChild! as T;
  }
  attach(
    component: IBaseComponent,
    position?: InsertPosition | undefined
  ): void {
    component.attachTo(this.element, position);
  }

  attachTo(parent: HTMLElement, position: InsertPosition = "afterbegin") {
    parent.insertAdjacentElement(position, this.element);
  }

  removeFrom(parent: HTMLElement) {
    if (parent !== this.element.parentElement) {
      throw new Error("parent mismatch!");
    }
    parent.removeChild(this.element);
  }
}
