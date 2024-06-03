import { Unsubscribable } from "rxjs";

import { DOMScene } from "../dom-scene";

/**
 * アクションコネクタ
 * DOMシーンとアクションを関連付ける
 * @template X シーンのデータ型
 * @param scene DOMシーン
 * @returns アンサブスクライバ
 */
export type DOMSceneActionConnector<X extends DOMScene> = (
  scene: X,
) => Unsubscribable[];
