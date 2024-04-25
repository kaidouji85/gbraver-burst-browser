import { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyLightningDozerCutIn,
  playerLightningDozerCutIn,
} from "../../../../../game-object/cut-in/lightning-dozer";
import { LightningDozerCutIn } from "../../../../../game-object/cut-in/lightning-dozer/lightning-dozer-cutin";
import { HUDLayerObjectCreatorParams } from "../creator-params";
import { HUDArmdozerObjects } from "./hud-armdozer-objects";

/**
 * HUDレイヤー ライトニングドーザ固有オブジェクト
 */
export class LightningDozerHUD implements HUDArmdozerObjects {
  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param cutIn カットイン
   */
  constructor(
    readonly playerId: PlayerId,
    readonly cutIn: LightningDozerCutIn,
  ) {}

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.cutIn.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[] {
    return [this.cutIn.getObject3D()];
  }
}

/**
 * プレイヤー HUDレイヤー ライトニングドーザ固有オブジェクト
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function playerLightningDozerHUD(
  params: HUDLayerObjectCreatorParams,
): LightningDozerHUD {
  const { player } = params;
  return new LightningDozerHUD(
    player.playerId,
    playerLightningDozerCutIn(params),
  );
}

/**
 * 敵 HUDレイヤー ライトニングドーザ固有オブジェクト
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function enemyLightningDozerHUD(
  params: HUDLayerObjectCreatorParams,
): LightningDozerHUD {
  const { enemy } = params;
  return new LightningDozerHUD(
    enemy.playerId,
    enemyLightningDozerCutIn(params),
  );
}
