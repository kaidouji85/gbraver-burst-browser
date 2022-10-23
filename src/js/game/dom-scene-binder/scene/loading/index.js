// @flow

import type {
  LoadingActions,
  LoadingProgress,
} from "../../../../resource/loading-actions";
import type { Stream, Unsubscriber } from "../../../../stream/stream";
import type { DOMScene } from "../dom-scene";
import { LoadingPresentation } from "./presentation";

/**
 * ローディング
 */
export class Loading implements DOMScene {
  #completedRate: number;
  #presentation: LoadingPresentation;
  #unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param loading ローディングストリーム
   */
  constructor(loading: Stream<LoadingActions>) {
    this.#completedRate = 0;
    this.#presentation = new LoadingPresentation();
    this.#unsubscriber = loading.subscribe((action) => {
      if (action.type === "LoadingProgress") {
        this.#onLoadingProgress(action);
      }
    });
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.#unsubscriber.unsubscribe();
  }

  /**
   * ルートHTML要素を取得する
   *
   * @return 取得結果
   */
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
