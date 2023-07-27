import { Observable, Unsubscribable } from "rxjs";

import type {
  LoadingActions,
} from "../../resource/loading/loading-actions";
import type { DOMScene } from "../dom-scene";
import { bindEventListeners } from "./procedures/bind-event-listeners";
import { createLoadingProps } from "./procedures/create-loading-props";
import { LoadingProps } from "./props";

/** ローディング画面 */
export class Loading implements DOMScene {
  /** プロパティ */
  #props: LoadingProps;
  /** アンサブスクライバ */
  #unsubscriber: Unsubscribable;

  /**
   * コンストラクタ
   * @param loading ローディングストリーム
   */
  constructor(loading: Observable<LoadingActions>) {
    this.#props = createLoadingProps();
    this.#unsubscriber = bindEventListeners(this.#props, loading);
  }

  /** @override */
  destructor(): void {
    this.#unsubscriber.unsubscribe();
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
