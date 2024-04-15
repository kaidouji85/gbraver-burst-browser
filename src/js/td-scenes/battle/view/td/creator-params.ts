import { Observable } from "rxjs";

import { GameObjectAction } from "../../../../game-object/action/game-object-action";
import { BattleViewCreatorParams } from "../creator-params";

/** 3Dレイヤーのすべてのゲームオブジェクト生成処理で使えるパラメータ */
export type TDLayerObjectCreatorParams = BattleViewCreatorParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};
