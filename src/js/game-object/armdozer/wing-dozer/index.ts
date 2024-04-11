import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import type { GameObjectAction } from "../../action/game-object-action";
import { EnemyWingDozerView } from "./view/enemy-wing-dozer-view";
import { PlayerWingDozerView } from "./view/player-wing-dozer-view";
import { WingDozer } from "./wing-dozer";

/** ウィングドーザ生成関数パラメータ */
type GenerateWingDozerParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤー側 ウィングドーザを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function PlayerWingDozer(params: GenerateWingDozerParams): WingDozer {
  const { resources } = params;
  const view = new PlayerWingDozerView(resources);
  return new WingDozer({ ...params, view });
}

/**
 * 敵側 ウィングドーザを生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function EnemyWingDozer(params: GenerateWingDozerParams): WingDozer {
  const { resources } = params;
  const view = new EnemyWingDozerView(resources);
  return new WingDozer({ ...params, view });
}
