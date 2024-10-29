import { Unsubscribable } from "rxjs";

import { DOMScene } from "../dom-scene";
import { bind } from "./bind";
import { dispose } from "./dispose";
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
   * DOMシーンをバインドする
   * @template X シーンのデータ型
   * @param scene バインドするシーン
   * @param unsubscribers バインドするシーンに関連するアンサブスクライバ
   */
  bind<X extends DOMScene>(scene: X, unsubscribers: Unsubscribable[]): void {
    bind(this.#props, scene, unsubscribers);
  }

  /**
   * バインドしているシーンを破棄する
   * 本メソッドはDOMシーンから3Dシーンに切り替わる際に呼ばれる想定
   */
  dispose(): void {
    dispose(this.#props);
  }

  /**
   * 本クラスのルートHTML要素を取得する
   * @returns 取得結果
   */
  getRootHTMLElement(): HTMLElement {
    return this.#props.root;
  }
}
