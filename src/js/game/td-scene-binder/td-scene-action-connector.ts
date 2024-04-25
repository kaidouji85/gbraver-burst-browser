import { Subject, Unsubscribable } from "rxjs";

import type { TDScene } from "../../td-scenes/td-scene";
import type { GameAction } from "../game-actions";

/**
 * ゲームアクションコネクタ
 * 3Dシーンとゲームアクションを関連付ける
 *
 * @template X シーンのデータ型
 * @param scene 3Dシーン
 * @param gameAction ゲームアクションストリーム
 * @returns ゲームションションのアンサブスクライブ
 */
export type TDSceneActionConnector<X extends TDScene> = (
  scene: X,
  gameAction: Subject<GameAction>,
) => Unsubscribable[];
