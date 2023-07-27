import { Observable, Unsubscribable } from "rxjs";

import type {
  LoadingActions,
  LoadingProgress,
} from "../../resource/loading/loading-actions";
import { domUuid } from "../../uuid/dom-uuid";
import type { DOMScene } from "../dom-scene";

/** ローディング画面 */
export class Loading implements DOMScene {
  /** ローディング完了率 */
  #completedRate: number;
  /** ルートHTML要素 */
  #root: HTMLElement;
  /** ローディング完了率のテキスト */
  #text: HTMLElement;
  /** ローディングバー */
  #bar: HTMLElement;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param loading ローディングストリーム
   */
  constructor(loading: Observable<LoadingActions>) {
    this.#completedRate = 0;
    const textId = domUuid();
    const barId = domUuid();
    this.#root = document.createElement("div");
    this.#root.innerHTML = `
      <div class="loading__progress">
        <div class="loading__progress-rate" data-id="${textId}"></div>
        <div class="loading__outer-progress-bar">
          <div class="loading__progress-bar" data-id="${barId}"></div>
        </div>
      </div>
    `;
    this.#root.className = "loading";
    this.#root.style.display = "flex";
    this.#text =
      this.#root.querySelector(`[data-id="${textId}"]`) ||
      document.createElement("div");
    this.#bar =
      this.#root.querySelector(`[data-id="${barId}"]`) ||
      document.createElement("div");
    this.#setCompletedRate(0);

    this.#unsubscriber = loading.subscribe((action) => {
      if (action.type === "LoadingProgress") {
        this.#onLoadingProgress(action);
      }
    });
  }

  /** @override */
  destructor(): void {
    this.#unsubscriber.unsubscribe();
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#root;
  }

  /**
   * リソースのローディング進捗に変化があった際のイベント
   *
   * @param action アクション
   */
  #onLoadingProgress(action: LoadingProgress): void {
    this.#completedRate = Math.max(action.completedRate, this.#completedRate);
    this.#setCompletedRate(this.#completedRate);
  }

  /**
   * ローディング進捗を変更する
   * @param completedRate 0〜1で指定する進捗率、1で完了
   */
  #setCompletedRate(completedRate: number): void {
    this.#text.innerText = `LOADING... ${Math.floor(completedRate * 100)}%`;
    this.#bar.style.width = `${completedRate * 100}%`;
  }
}
