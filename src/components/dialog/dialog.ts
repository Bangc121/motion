import { BaseComponent, IBaseComponent } from "../base.js";

import { Composable } from "../page/page.js";

type OnCloseListener = () => void;
type onSubmitListener = () => void;

export interface MediaData {
  readonly title: string;
  readonly url: string;
}

export interface TextData {
  readonly title: string;
  readonly body: string;
}

export class Inputdialog
  extends BaseComponent<HTMLElement>
  implements Composable
{
  closeListener?: OnCloseListener;
  submitListener?: onSubmitListener;

  constructor() {
    super(`<dialog class="dialog">
            <div class="dialog__container">
            <button class="dialog__close">&times;</button>
            <div id="dialog__body"></div>
            <button class="dialog__submit">ADD</button>
            </div>
            </dialog>`);

    const closeButton = this.element.querySelector(
      ".dialog__close"
    )! as HTMLElement;

    closeButton.onclick = () => {
      this.closeListener && this.closeListener();
    };
    const submitButton = this.element.querySelector(
      ".dialog__submit"
    )! as HTMLElement;

    submitButton.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }

  setOnSubmitListener(listener: onSubmitListener) {
    this.submitListener = listener;
  }

  addChild(child: IBaseComponent): void {
    const body = this.element.querySelector("#dialog__body")! as HTMLElement;
    child.attachTo(body);
  }
}
