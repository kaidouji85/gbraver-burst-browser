import { Observable } from "rxjs";

import { GameObjectAction } from "../../../../game-object/action/game-object-action";
import { GenerateBattleViewParams } from "../generate-params";

/** HUDレイヤーのすべてのゲームオブジェクト生成処理で使えるパラメータ */
export type GenerateHUDLayerObjectParams = GenerateBattleViewParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};
