import { Observable } from "rxjs";

import type { Resources } from "../../resource";
import { SEPlayer } from "../../se/se-player";
import type { GameObjectAction } from "../action/game-object-action";
import { DamageHalved } from "./damage-halved";
import { EnemyDamageHalvedView } from "./view/enemy-damage-halved-view";
import { PlayerDamageHalvedView } from "./view/player-damage-halved-view";

/** ダメージ半減生成パラメータ */
export type DamageHalvedCreatorParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生オブジェクト */
  se: SEPlayer;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー ダメージ半減 ポップアップ
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerDamageHalved(
  params: DamageHalvedCreatorParams,
): DamageHalved {
  const { resources } = params;
  const view = new PlayerDamageHalvedView(resources);
  return new DamageHalved({ ...params, view });
}

/**
 * 敵 ダメージ半減 ポップアップ
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyDamageHalved(
  params: DamageHalvedCreatorParams,
): DamageHalved {
  const { resources } = params;
  const view = new EnemyDamageHalvedView(resources);
  return new DamageHalved({ ...params, view });
}
