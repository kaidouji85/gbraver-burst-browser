import { Observable, Unsubscribable } from "rxjs";

import { DOMScene } from "../dom-scene";
import { PlayerSelection } from "./player-selection";
import { bindEventListeners } from "./procedures/bind-event-listeners";
import {
  createSecretPlayerSelectProps,
  CreateSecretPlayerSelectPropsParams,
} from "./procedures/create-secret-player-select-props";
import { SecretPlayerSelectProps } from "./props";

/** コンストラクタのパラメータ */
type Params = CreateSecretPlayerSelectPropsParams;

/**
 * シークレットプレイヤーセレクト画面
 * プレイヤーの選択内容を画面に表示しないモード、動画配信などでプレイ画面を配信する時に使う想定
 */
export class SecretPlayerSelect implements DOMScene {
  /** プロパティ */
  #props: SecretPlayerSelectProps;
  #unsubscribers: Unsubscribable[];

  /**
   * コンストラクタ
   */
  constructor(params: Params) {
    this.#props = createSecretPlayerSelectProps(params);
    this.#unsubscribers = bindEventListeners(this.#props);
  }

  /** @override */
  destructor(): void {
    this.#unsubscribers.forEach((u) => {
      u.unsubscribe();
    });
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }

  /**
   * 決定通知
   * @return 決定通知ストリーム
   */
  notifyOK(): Observable<PlayerSelection> {
    return this.#props.ok;
  }

  /**
   * 戻る通知
   * @return 戻る通知ストリーム
   */
  notifyPrev(): Observable<void> {
    return this.#props.prev;
  }
}
