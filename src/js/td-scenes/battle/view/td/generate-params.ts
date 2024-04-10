import { Observable } from "rxjs";

import { GameObjectAction } from "../../../../game-object/action/game-object-action";
import { GenerateBattleViewParams } from "../generate-params";

/** 3Dレイヤーのすべてのゲームオブジェクト生成処理で使えるパラメータ */
export type GenerateTDLayerObjectParams = GenerateBattleViewParams & {
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};
