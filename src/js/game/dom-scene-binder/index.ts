import { Observable } from "rxjs";

import type { DOMScene } from "../../dom-scenes/dom-scene";
import type { GameAction } from "../game-actions";
import { bind } from "./bind";
import { discardCurrentScene } from "./discard-current-scene";
import type { DOMSceneActionConnector } from "./dom-scene-action-connector";
import type { DOMSceneBinderProps } from "./props";
import { createDOMSceneBinderProps } from "./props";

/** DOMシーンバインダー */
export class DOMSceneBinder {
  #props: DOMSceneBinderProps;

  /**
   * コンストラクタ
   */
  constructor() {
    this.#props = createDOMSceneBinderProps();
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
   * @template X シーンのデータ型
   * @param scene バインドするシーン
   * @param connector ゲームアクションコネクタ
   */
  bind<X extends DOMScene>(
    scene: X,
    connector: DOMSceneActionConnector<X>,
  ): void {
    bind(this.#props, scene, connector);
  }

  /**
   * ゲームアクション通知
   *
   * @returns 通知ストリーム
   */
  gameActionNotifier(): Observable<GameAction> {
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
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
