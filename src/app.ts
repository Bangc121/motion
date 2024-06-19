import {
  Composable,
  PageComponent,
  PageItemComponent,
} from "./components/page/page.js";
import {
  Inputdialog,
  MediaData,
  TextData,
} from "./components/dialog/dialog.js";

import { IBaseComponent } from "./components/base.js";
import { ImageComponent } from "./components/page/item/image.js";
import { MediaSectionInput } from "./components/dialog/input/media-input.js";
import { NoteComponent } from "./components/page/item/note.js";
import { TextSectionInput } from "./components/dialog/input/text-input.js";
import { TodoComponent } from "./components/page/item/todo.js";
import { VideoComponent } from "./components/page/item/video.js";

type InputComponentConstructor<T = (MediaData | TextData) & IBaseComponent> = {
  new (): T;
};

class App {
  private readonly page: IBaseComponent & Composable;
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    this.bindElementToDialog<MediaSectionInput>(
      "#new-image",
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
    );

    this.bindElementToDialog<MediaSectionInput>(
      "#new-video",
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
    );

    this.bindElementToDialog<TextSectionInput>(
      "#new-note",
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body)
    );

    this.bindElementToDialog<TextSectionInput>(
      "#new-todo",
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body)
    );
  }

  private bindElementToDialog<
    T extends (MediaData | TextData) & IBaseComponent
  >(
    selector: string,
    InputComponent: InputComponentConstructor<T>,
    makeSetion: (input: T) => IBaseComponent
  ) {
    const element = document.querySelector(selector)! as HTMLButtonElement;

    element.addEventListener("click", () => {
      const dialog = new Inputdialog();
      const input = new InputComponent();
      dialog.addChild(input);
      dialog.attachTo(this.dialogRoot);

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });

      dialog.setOnSubmitListener(() => {
        // 섹션을 만들어서 페이지에 추가
        // const image = new ImageComponent(
        //   "Image Title",
        //   "https://picsum.photos/600/300"
        // );
        const image = makeSetion(input);
        this.page.addChild(image);
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

new App(document.querySelector(".document")! as HTMLElement, document.body);
