import { Unsubscribable } from "rxjs";

import { DOMScene } from "../dom-scene";

/**
 * ゲームアクションコネクタ
 * DOMシーンとゲームアクションを関連付ける
 *
 * @template X シーンのデータ型
 * @param scene DOMシーン
 * @returns ゲームションションのアンサブスクライブ
 */
export type DOMSceneActionConnector<X extends DOMScene> = (
  scene: X,
) => Unsubscribable[];
