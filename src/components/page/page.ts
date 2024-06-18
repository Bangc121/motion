import { BaseComponent, IBaseComponent } from "../base.js";

export interface Composable {
  addChild(child: IBaseComponent): void;
}

type OnCloseListener = () => void;

interface SectionContainer extends IBaseComponent, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
}

type SectionContainerConstructor = {
  new (): SectionContainer;
};

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements SectionContainer
{
  private closeListener?: OnCloseListener;
  constructor() {
    super(`<li class="page-item">
            <section class="page-item__body"></section>
            <div class="page-item__controls">
            <button class="close">x</button>
            </div>
          </li>`);
    const closeButton = this.element.querySelector(
      ".close"
    )! as HTMLButtonElement;
    closeButton.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }

  addChild(child: IBaseComponent) {
    const container = this.element.querySelector(
      ".page-item__body"
    )! as HTMLElement;
    child.attachTo(container);
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
}
export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
  }

  addChild(section: IBaseComponent) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, "beforeend");
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
  }
}
