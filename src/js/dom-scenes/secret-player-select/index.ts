import { DOMScene } from "../dom-scene";
import { createSecretPlayerSelectProps } from "./procedures/create-secret-player-select-props";
import { SecretPlayerSelectProps } from "./props";

/** 
 * シークレットプレイヤーセレクト画面
 * プレイヤーの選択内容を画面に表示しないモード、動画配信などでプレイ画面を配信する時に使う想定
 */
export class SecretPlayerSelect implements DOMScene {
  /** プロパティ */
  #props: SecretPlayerSelectProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createSecretPlayerSelectProps();
  }

  /** @override */
  destructor(): void {
    // NOP
  }

  /** @override */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
