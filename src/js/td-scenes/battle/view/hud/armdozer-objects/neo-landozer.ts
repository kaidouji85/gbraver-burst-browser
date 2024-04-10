import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyNeoLandozerCutIn,
  playerNeoLandozerCutIn,
} from "../../../../../game-object/cut-in/neo-landozer";
import { NeoLandozerCutIn } from "../../../../../game-object/cut-in/neo-landozer/neo-landozer-cutin";
import { GenerateHUDLayerObjectParams } from "../generate-params";
import type { HUDArmdozerObjects } from "./hud-armdozer-objects";

/**
 * HUDレイヤー ネオランドーザ固有オブジェクト フィールド
 */
interface NeoLandozerHUDField {
  cutIn: NeoLandozerCutIn;
}

/**
 * HUDレイヤー ネオランドーザ固有のオブジェクトをあつめたもの
 */
export class NeoLandozerHUD implements HUDArmdozerObjects, NeoLandozerHUDField {
  playerId: PlayerId;
  cutIn: NeoLandozerCutIn;

  constructor(playerId: PlayerId, field: NeoLandozerHUDField) {
    this.playerId = playerId;
    this.cutIn = field.cutIn;
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
 * プレイヤー側 HUDレイヤー ネオランドーザ固有オブジェクト
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerNeoLandozerHUD(
  params: GenerateHUDLayerObjectParams,
): NeoLandozerHUD {
  const { resources, player, gameObjectAction } = params;
  return new NeoLandozerHUD(player.playerId, {
    cutIn: playerNeoLandozerCutIn(resources, gameObjectAction),
  });
}

/**
 * 敵側 HUDレイヤー ネオランドーザ固有オブジェクト
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyNeoLandozerHUD(
  params: GenerateHUDLayerObjectParams,
): NeoLandozerHUD {
  const { resources, enemy, gameObjectAction } = params;
  return new NeoLandozerHUD(enemy.playerId, {
    cutIn: enemyNeoLandozerCutIn(resources, gameObjectAction),
  });
}
