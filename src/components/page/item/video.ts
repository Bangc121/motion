import { BaseComponent } from "../../base.js";

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="video">
            <h1 class="page-item__title video__title"></h1>
            <div class="video__holder">
                <iframe width="420" height="345" class="video__iframe" />
            </div>
            </section>`);

    const videoElement = this.element.querySelector(
      ".video__iframe"
    )! as HTMLIFrameElement;
    videoElement.src = this.convertToEmbeddedURL(url);
    videoElement.id = title;

    const titleElement = this.element.querySelector(
      ".video__title"
    )! as HTMLHeadingElement;
    titleElement.textContent = title;
  }

  // 정규표현식 Regex
  private convertToEmbeddedURL(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);
    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    return url;
  }
}
