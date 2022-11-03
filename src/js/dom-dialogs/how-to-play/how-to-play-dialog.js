// @flow
import { Howl } from "howler";

import { pop } from "../../dom/animation";
import type { PushDOM } from "../../dom/event-stream";
import { pushDOMStream } from "../../dom/event-stream";
import { Exclusive } from "../../exclusive/exclusive";
import type { Resources } from "../../resource";
import { PathIds } from "../../resource/path";
import { SOUND_IDS } from "../../resource/sound";
import type { Stream, StreamSource, Unsubscriber } from "../../stream/stream";
import { createStreamSource } from "../../stream/stream";
import { domUuid } from "../../uuid/dom-uuid";
import type { DOMDialog } from "../dialog";

/**
 * 遊び方ダイアログ
 */
export class HowToPlay implements DOMDialog {
  #root: HTMLElement;
  #closer: HTMLElement;
  #close: StreamSource<void>;
  #unsubscribers: Unsubscriber[];
  #changeValue: typeof Howl;
  #exclusive: Exclusive;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   * @param movieURL 動画URL
   */
  constructor(resources: Resources, movieURL: string) {
    const closerId = domUuid();
    const closerPath =
      resources.paths.find((v) => v.id === PathIds.CLOSER)?.path ?? "";
    this.#changeValue =
      resources.sounds.find((v) => v.id === SOUND_IDS.CHANGE_VALUE)?.sound ??
      new Howl();

    this.#root = document.createElement("div");
    this.#root.className = "how-to-play";
    this.#root.innerHTML = `
      <div class="how-to-play__background"></div>
      <img class="how-to-play__closer" alt="閉じる" src="${closerPath}" data-id="${closerId}"></img>
      <div class="how-to-play__dialog">
        <iframe class="how-to-play__movie" src="${movieURL}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  
      </div>
    `;

    this.#closer =
      this.#root.querySelector(`[data-id="${closerId}"]`) ||
      document.createElement("div");
    this.#close = createStreamSource();

    this.#unsubscribers = [
      pushDOMStream(this.#closer).subscribe((action) => {
        this.#onCloserPush(action);
      }),

      pushDOMStream(this.#root).subscribe((action) => {
        this.#onPushOutsideOfDialog(action);
      }),
    ];
    this.#exclusive = new Exclusive();
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#unsubscribers.forEach((v) => {
      v.unsubscribe();
    });
  }

  /**
   * ダイアログ閉じの通知
   *
   * @return 通知ストリーム
   */
  closeNotifier(): Stream<void> {
    return this.#close;
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * 閉じるアイコンを押した時の処理
   *
   * @param action アクション
   */
  #onCloserPush(action: PushDOM): void {
    this.#exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      await Promise.all([this.#changeValue.play(), pop(this.#closer, 1.3)]);
      this.#close.next();
    });
  }

  /**
   * ダイアログ外を押した時の処理
   *
   * @param action アクション
   */
  #onPushOutsideOfDialog(action: PushDOM): void {
    this.#exclusive.execute(async (): Promise<void> => {
      action.event.preventDefault();
      await this.#changeValue.play();
      this.#close.next();
    });
  }
}
