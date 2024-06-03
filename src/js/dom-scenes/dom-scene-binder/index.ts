import { DOMScene } from "../dom-scene";
import { DOMSceneActionConnector } from "./action-connector";
import { bind } from "./bind";
import { discardCurrentScene } from "./discard-current-scene";
import { createDOMSceneBinderProps, DOMSceneBinderProps } from "./props";

/** DOMシーンバインダー */
export class DOMSceneBinder {
  /** プロパティ */
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
   * 本クラス配下のシーンを全て非表示にする
   * 本メソッドは、3Dシーンを表示する前に呼ばれる想定である
   */
  hidden(): void {
    discardCurrentScene(this.#props);
  }

  /**
   * 本クラスのルートHTML要素を取得する
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
