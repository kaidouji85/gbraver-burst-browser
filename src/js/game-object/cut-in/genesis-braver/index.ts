import { Observable } from "rxjs";

import { Resources } from "../../../resource";
import { GameObjectAction } from "../../action/game-object-action";
import { GenesisBraverCutIn } from "./genesis-braver-cutin";
import { EnemyGenesisBraverCutInView } from "./view/enemy-genesis-braver-cutin-view";
import { PlayerGenesisBraverCutInView } from "./view/player-genesis-braver-cutin-view";

/** ジェネシスブレイバー カットイン生成パラメータ */
export type GenesisBraverCutInCreatorParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー ジェネシスブレイバー カットイン を生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerGenesisBraverCutIn(
  params: GenesisBraverCutInCreatorParams,
): GenesisBraverCutIn {
  const { resources } = params;
  const view = new PlayerGenesisBraverCutInView(resources);
  return new GenesisBraverCutIn({ ...params, view });
}

/**
 * 敵 ジェネシスブレイバー カットイン を生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyGenesisBraverCutIn(
  params: GenesisBraverCutInCreatorParams,
): GenesisBraverCutIn {
  const { resources } = params;
  const view = new EnemyGenesisBraverCutInView(resources);
  return new GenesisBraverCutIn({ ...params, view });
}
