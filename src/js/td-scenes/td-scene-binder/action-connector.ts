import { Unsubscribable } from "rxjs";

import { TDScene } from "../td-scene";

/**
 * ゲームアクションコネクタ
 * 3Dシーンとゲームアクションを関連付ける
 * @template X シーンのデータ型
 * @param scene 3Dシーン
 * @returns ゲームションションのアンサブスクライブ
 */
export type TDSceneActionConnector<X extends TDScene> = (
  scene: X,
) => Unsubscribable[];
