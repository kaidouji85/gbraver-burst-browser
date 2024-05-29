import { Subject, Unsubscribable } from "rxjs";

import { GameAction } from "../../game/game-actions";
import { DOMScene } from "../dom-scene";

/**
 * ゲームアクションコネクタ
 * DOMシーンとゲームアクションを関連付ける
 *
 * @template X シーンのデータ型
 * @param scene DOMシーン
 * @param gameAction ゲームアクションストリーム
 * @returns ゲームションションのアンサブスクライブ
 */
export type DOMSceneActionConnector<X extends DOMScene> = (
  scene: X,
  gameAction: Subject<GameAction>,
) => Unsubscribable[];
