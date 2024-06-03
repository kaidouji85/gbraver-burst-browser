import { Unsubscribable } from "rxjs";

import { TDScene } from "../td-scene";

/**
 * アクションコネクタ
 * 3Dシーンとアクションを関連付ける
 * @template X シーンのデータ型
 * @param scene 3Dシーン
 * @returns アンサブスクライバ
 */
export type TDSceneActionConnector<X extends TDScene> = (
  scene: X,
) => Unsubscribable[];
