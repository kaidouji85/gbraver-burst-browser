import { Observable } from "rxjs";

import type { Resources } from "../../../resource";
import {SEPlayer} from "../../../se/se-player";
import type { GameObjectAction } from "../../action/game-object-action";
import { initialValue } from "./model/initial-value";
import { ShockWave } from "./shock-wave";
import { EnemyShockWaveView } from "./view/enemy-shock-wave-view";
import { PlayerShockWaveView } from "./view/player-shock-wave-view";

/** 生成パラメータ */
export type GenerateShockWaveParams = {
  /** リソース管理オブジェクト */
  resources: Resources;
  /** SE再生オブジェクト */
  se: SEPlayer;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * プレイヤーの衝撃波を生成する
 * @param params 生成パラメータ
 * @return 衝撃波
 */
export function playerShockWave(params: GenerateShockWaveParams): ShockWave {
  const { resources } = params;
  const initialModel = initialValue();
  const view = new PlayerShockWaveView(resources, initialModel);
  return new ShockWave({ ...params, view, initialModel });
}

/**
 * 敵の衝撃波を生成する
 * @param params 生成パラメータ
 * @return 衝撃波
 */
export function enemyShockWave(params: GenerateShockWaveParams): ShockWave {
  const { resources } = params;
  const initialModel = initialValue();
  const view = new EnemyShockWaveView(resources, initialModel);
  return new ShockWave({ ...params, view, initialModel });
}
