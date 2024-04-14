import { Observable } from "rxjs";

import type { Resources } from "../../resource";
import type { GameObjectAction } from "../action/game-object-action";
import { DamageHalved } from "./damage-halved";
import { EnemyDamageHalvedView } from "./view/enemy-damage-halved-view";
import { PlayerDamageHalvedView } from "./view/player-damage-halved-view";

/** ダメージ半減生成パラメータ */
export type GenerateDamageHalvedParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー ダメージ半減 ポップアップ
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerDamageHalved(
  params: GenerateDamageHalvedParams,
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
  params: GenerateDamageHalvedParams,
): DamageHalved {
  const { resources } = params;
  const view = new EnemyDamageHalvedView(resources);
  return new DamageHalved({ ...params, view });
}
