// @flow
import type { StreamSource, Unsubscriber } from "../../../stream/stream";
import type { TDScene } from "../../../td-scenes/td-scene";
import type { GameAction } from "../../game-actions";

/**
 * ゲームアクションコネクタ
 * 3Dシーンとゲームアクションを関連付ける
 *
 * @template X シーンのデータ型
 * @param scene 3Dシーン
 * @param gameAction ゲームアクションストリーム
 * @return ゲームションションのアンサブスクライブ
 */
export type TDSceneActionConnector<X: TDScene> = (
  scene: X,
  gameAction: StreamSource<GameAction>
) => Unsubscriber[];
