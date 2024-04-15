import { Observable } from "rxjs";

import { GameObjectAction } from "../../../../game-object/action/game-object-action";
import { BattleViewCreatorParams } from "../creator-params";

/** HUDレイヤーのすべてのゲームオブジェクト生成処理で使えるパラメータ */
export type HUDLayerObjectCreatorParams = BattleViewCreatorParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};
