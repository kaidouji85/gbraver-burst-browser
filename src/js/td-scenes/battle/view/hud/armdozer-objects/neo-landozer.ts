import { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyNeoLandozerCutIn,
  playerNeoLandozerCutIn,
} from "../../../../../game-object/cut-in/neo-landozer";
import { NeoLandozerCutIn } from "../../../../../game-object/cut-in/neo-landozer/neo-landozer-cutin";
import { HUDLayerObjectCreatorParams } from "../creator-params";
import { HUDArmdozerObjects } from "./hud-armdozer-objects";

/** HUDレイヤー ネオランドーザ固有のオブジェクトをあつめたもの */
export class NeoLandozerHUD implements HUDArmdozerObjects {
  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param cutIn カットイン
   */
  constructor(
    readonly playerId: PlayerId,
    readonly cutIn: NeoLandozerCutIn,
  ) {}

  /** @override */
  destructor(): void {
    this.cutIn.destructor();
  }

  /** @override */
  getObject3Ds(): THREE.Object3D[] {
    return [this.cutIn.getObject3D()];
  }
}

/**
 * プレイヤー側 HUDレイヤー ネオランドーザ固有オブジェクト
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerNeoLandozerHUD(
  params: HUDLayerObjectCreatorParams,
): NeoLandozerHUD {
  const { player } = params;
  return new NeoLandozerHUD(player.playerId, playerNeoLandozerCutIn(params));
}

/**
 * 敵側 HUDレイヤー ネオランドーザ固有オブジェクト
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyNeoLandozerHUD(
  params: HUDLayerObjectCreatorParams,
): NeoLandozerHUD {
  const { enemy } = params;
  return new NeoLandozerHUD(enemy.playerId, enemyNeoLandozerCutIn(params));
}
