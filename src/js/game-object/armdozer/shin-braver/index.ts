import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { ShinBraver } from "./shin-braver";
import { EnemyShinBraverView } from "./view/enemy-shin-braver-view";
import { PlayerShinBraverView } from "./view/player-shin-braver-view";

/** シンブレイバー生成関数パラメータ */
type GenerateShinBraverParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側シンブレイバー
 * @param params 生成パラメータ
 * @return シンブレイバー
 */
export function PlayerShinBraver(params: GenerateShinBraverParams): ShinBraver {
  const { resources } = params;
  const view = new PlayerShinBraverView(resources);
  return new ShinBraver({ ...params, view });
}

/**
 * 敵側シンブレイバー
 * @param params 生成パラメータ
 * @return シンブレイバー
 */
export function EnemyShinBraver(params: GenerateShinBraverParams): ShinBraver {
  const { resources } = params;
  const view = new EnemyShinBraverView(resources);
  return new ShinBraver({ ...params, view });
}
