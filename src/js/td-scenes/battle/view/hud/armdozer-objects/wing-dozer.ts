import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyWingDozerCutIn,
  playerWingDozerCutIn,
} from "../../../../../game-object/cut-in/wing-dozer";
import { WingDozerCutIn } from "../../../../../game-object/cut-in/wing-dozer/wing-dozer-cutin";
import { GenerateHUDLayerObjectParams } from "../generate-params";
import type { HUDArmdozerObjects } from "./hud-armdozer-objects";

/** コンストラクタのパラメータ */
type Param = {
  playerId: PlayerId;
  cutIn: WingDozerCutIn;
};

/**
 * HUDレイヤー ウィングドーザ固有のオブジェクトをあつめたもの
 */
export class WingDozerHUD implements HUDArmdozerObjects {
  playerId: PlayerId;
  cutIn: WingDozerCutIn;

  constructor(param: Param) {
    this.playerId = param.playerId;
    this.cutIn = param.cutIn;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.cutIn.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[] {
    return [this.cutIn.getObject3D()];
  }
}

/**
 * プレイヤー側 ウィングドーザHUD
 * @param params 生成パラメータ
 * @return ウィングドーザHUD
 */
export function playerWingDozerHUD(
  params: GenerateHUDLayerObjectParams,
): WingDozerHUD {
  const { resources, player, gameObjectAction } = params;
  return new WingDozerHUD({
    playerId: player.playerId,
    cutIn: playerWingDozerCutIn(resources, gameObjectAction),
  });
}

/**
 * 敵側 ウィングドーザHUD
 * @param params 生成パラメータ
 * @return ウィングドーザHUD
 */
export function enemyWingDozerHUD(
  params: GenerateHUDLayerObjectParams,
): WingDozerHUD {
  const { resources, enemy, gameObjectAction } = params;
  return new WingDozerHUD({
    playerId: enemy.playerId,
    cutIn: enemyWingDozerCutIn(resources, gameObjectAction),
  });
}
