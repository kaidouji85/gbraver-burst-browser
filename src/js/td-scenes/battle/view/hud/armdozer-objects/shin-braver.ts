import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyShinBraverCutIn,
  playerShinBraverCutIn,
} from "../../../../../game-object/cut-in/shin-braver";
import { ShinBraverCutIn } from "../../../../../game-object/cut-in/shin-braver/shin-braver-cutin";
import { GenerateHUDLayerObjectParams } from "../generate-params";
import type { HUDArmdozerObjects } from "./hud-armdozer-objects";

/** コンストラクタのパラメータ */
type Param = {
  playerId: PlayerId;
  cutIn: ShinBraverCutIn;
};

/**
 * HUDレイヤー シンブレイバー固有のオブジェクトをあつめたもの
 */
export class ShinBraverHUD implements HUDArmdozerObjects {
  playerId: PlayerId;
  cutIn: ShinBraverCutIn;

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
 * プレイヤー側 シンブレイバーHUD
 * @param params 生成パラメータ
 * @return シンブレイバーHUD
 */
export function playerShinBraverHUD(
  params: GenerateHUDLayerObjectParams,
): HUDArmdozerObjects {
  const { player } = params;
  return new ShinBraverHUD({
    playerId: player.playerId,
    cutIn: playerShinBraverCutIn(params),
  });
}

/**
 * 敵側 シンブレイバーHUD
 * @param params 生成パラメータ
 * @return シンブレイバーHUD
 */
export function enemyShinBraverHUD(
  params: GenerateHUDLayerObjectParams,
): HUDArmdozerObjects {
  const { enemy } = params;
  return new ShinBraverHUD({
    playerId: enemy.playerId,
    cutIn: enemyShinBraverCutIn(params),
  });
}
