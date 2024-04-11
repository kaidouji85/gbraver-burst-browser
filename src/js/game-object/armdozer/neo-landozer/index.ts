import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { NeoLandozer } from "./neo-landozer";
import { EnemyNeoLandozerView } from "./view/enemy-neo-landozer-view";
import { PlayerNeoLandozerView } from "./view/player-neo-landozer-view";

/** ネオランドーザ生成関数パラメータ */
type GenerateNeoLandozerParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側ネオランドーザ
 * @param params 生成パラメータ
 * @return ネオランドーザ
 */
export function PlayerNeoLandozer(
  params: GenerateNeoLandozerParams,
): NeoLandozer {
  const { resources } = params;
  const view = new PlayerNeoLandozerView(resources);
  return new NeoLandozer({ ...params, view });
}

/**
 * 敵側ネオランドーザ
 * @param params 生成パラメータ
 * @return ネオランドーザ
 */
export function EnemyNeoLandozer(
  params: GenerateNeoLandozerParams,
): NeoLandozer {
  const { resources } = params;
  const view = new EnemyNeoLandozerView(resources);
  return new NeoLandozer({ ...params, view });
}
