import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyLightningiDozerCutIn,
  playerLightningDozerCutIn,
} from "../../../../../game-object/cut-in/lightning-dozer";
import { LightningDozerCutIn } from "../../../../../game-object/cut-in/lightning-dozer/lightning-dozer-cutin";
import { HUDLayerObjectCreatorParams } from "../creator-params";
import type { HUDArmdozerObjects } from "./hud-armdozer-objects";

/**
 * HUDレイヤー ライトニングドーザ固有オブジェクト フィールド
 */
interface LightningDozerHUDField {
  cutIn: LightningDozerCutIn;
}

/**
 * HUDレイヤー ライトニングドーザ固有オブジェクト
 */
export class LightningDozerHUD
  implements HUDArmdozerObjects, LightningDozerHUDField
{
  playerId: PlayerId;
  cutIn: LightningDozerCutIn;

  /**
   * コンストラクタ
   *
   * @param playerId プレイヤーID
   * @param param フィールド
   */
  constructor(playerId: PlayerId, param: LightningDozerHUDField) {
    this.playerId = playerId;
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
 * プレイヤー HUDレイヤー ライトニングドーザ固有オブジェクト
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerLightningDozerHUD(
  params: HUDLayerObjectCreatorParams,
): LightningDozerHUD {
  const { player } = params;
  return new LightningDozerHUD(player.playerId, {
    cutIn: playerLightningDozerCutIn(params),
  });
}

/**
 * 敵 HUDレイヤー ライトニングドーザ固有オブジェクト
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyLightningDozerHUD(
  params: HUDLayerObjectCreatorParams,
): LightningDozerHUD {
  const { enemy } = params;
  return new LightningDozerHUD(enemy.playerId, {
    cutIn: enemyLightningiDozerCutIn(params),
  });
}
