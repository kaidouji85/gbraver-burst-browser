import { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import {
  EnemyWingDozer,
  PlayerWingDozer,
} from "../../../../../game-object/armdozer/wing-dozer";
import { WingDozer } from "../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import { TDLayerObjectCreatorParams } from "../creator-params";
import { TDArmdozerObjects } from "./armdozer-objects";

/** ウィングドーザ 3Dレイヤー */
export class WingDozerTD implements TDArmdozerObjects {
  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param wingDozer スプライト
   */
  constructor(
    readonly playerId: PlayerId,
    readonly wingDozer: WingDozer,
  ) {}

  /** @override */
  destructor(): void {
    this.wingDozer.destructor();
  }

  /** @override */
  sprite(): ArmdozerSprite {
    return this.wingDozer;
  }

  /** @override */
  getObject3Ds(): THREE.Object3D[] {
    return [this.wingDozer.getObject3D()];
  }
}

/**
 * プレイヤー 3Dレイヤー ウィングドーザ 3Dレイヤー
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerWingDozerTD(
  params: TDLayerObjectCreatorParams,
): WingDozerTD {
  const { player } = params;
  return new WingDozerTD(player.playerId, PlayerWingDozer(params));
}

/**
 * 敵 3Dレイヤー ウィングドーザ 3Dレイヤー
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyWingDozerTD(
  params: TDLayerObjectCreatorParams,
): WingDozerTD {
  const { enemy } = params;
  return new WingDozerTD(enemy.playerId, EnemyWingDozer(params));
}
