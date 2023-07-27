import { Observable, Unsubscribable } from "rxjs";

import type {
  LoadingActions,
  LoadingProgress,
} from "../../resource/loading/loading-actions";
import type { DOMScene } from "../dom-scene";
import { LoadingPresentation } from "./presentation";

/** ローディング画面 */
export class Loading implements DOMScene {
  /** ローディング完了率 */
  #completedRate: number;
  /** @deprecated プレゼンテーション */
  #presentation: LoadingPresentation;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param loading ローディングストリーム
   */
  constructor(loading: Observable<LoadingActions>) {
    this.#completedRate = 0;
    this.#presentation = new LoadingPresentation();
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
    return this.#presentation.getRootHTMLElement();
  }

  /**
   * リソースのローディング進捗に変化があった際のイベント
   *
   * @param action アクション
   */
  #onLoadingProgress(action: LoadingProgress): void {
    this.#completedRate = Math.max(action.completedRate, this.#completedRate);
    this.#presentation.setCompletedRate(this.#completedRate);
  }
}
