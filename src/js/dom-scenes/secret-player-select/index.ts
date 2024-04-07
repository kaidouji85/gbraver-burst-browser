import { Unsubscribable } from "rxjs";

import { DOMScene } from "../dom-scene";
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
}
