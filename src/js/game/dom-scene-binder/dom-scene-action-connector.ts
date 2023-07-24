import { Subject, Unsubscribable } from "rxjs";

import type { DOMScene } from "../../dom-scenes/dom-scene";
import type { GameAction } from "../game-actions";

/**
 * ゲームアクションコネクタ
 * DOMシーンとゲームアクションを関連付ける
 *
 * @template X シーンのデータ型
 * @param scene DOMシーン
 * @param gameAction ゲームアクションストリーム
 * @return ゲームションションのアンサブスクライブ
 */
export type DOMSceneActionConnector<X extends DOMScene> = (
  scene: X,
  gameAction: Subject<GameAction>,
) => Unsubscribable[];
