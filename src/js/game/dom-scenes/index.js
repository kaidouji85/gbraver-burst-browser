// @flow

import type { Stream } from "../../stream/stream";
import type { GameAction } from "../game-actions";
import type { DOMSceneActionConnector } from "./action-connector/dom-scene-action-connector";
import { bind } from "./bind";
import { discardCurrentScene } from "./discard-current-scene";
import type { DOMScene } from "./dom-scene";
import type { DOMScenesProps } from "./props";
import { createDOMScenesProps } from "./props";

/**
 * HTMLオンリーで生成されたシーンを集めたもの
 * 本クラス配下のいずれか1シーンのみが表示される想定
 */
export class DOMScenes {
  #props: DOMScenesProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createDOMScenesProps();
  }

  /**
   * デストラクタ相当の処理
   */
  destructor() {
    discardCurrentScene(this.#props);
  }

  /**
   * DOMシーンをバインドする
   *
   * @param scene バインドするシーン
   * @param connector ゲームアクションコネクタ
   */
  bind<X: DOMScene>(scene: X, connector: DOMSceneActionConnector<X>): void {
    bind(this.#props, scene, connector);
  }

  /**
   * ゲームアクション通知
   *
   * @return 通知ストリーム
   */
  gameActionNotifier(): Stream<GameAction> {
    return this.#props.gameAction;
  }

  /**
   * 本クラス配下のシーンを全て非表示にする
   * 本メソッドは、3Dシーンを表示する前に呼ばれる想定である
   */
  hidden(): void {
    discardCurrentScene(this.#props);
  }

  /**
   * 本クラスのルートHTML要素を取得する
   *
   * @return 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
