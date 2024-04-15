import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import type { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import {
  EnemyWingDozer,
  PlayerWingDozer,
} from "../../../../../game-object/armdozer/wing-dozer";
import { WingDozer } from "../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import { TDLayerObjectCreatorParams } from "../creator-params";
import type { TDArmdozerObjects } from "./armdozer-objects";

/** ウィングドーザ 3Dレイヤー フィールド */
interface WingDozerTDField {
  /** ウィングドーザ */
  wingDozer: WingDozer;
}

/** ウィングドーザ 3Dレイヤー */
export class WingDozerTD implements WingDozerTDField, TDArmdozerObjects {
  /** @override */
  playerId: PlayerId;

  /** @override */
  wingDozer: WingDozer;

  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param field フィールド
   */
  constructor(playerId: PlayerId, field: WingDozerTDField) {
    this.playerId = playerId;
    this.wingDozer = field.wingDozer;
  }

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
  return new WingDozerTD(player.playerId, {
    wingDozer: PlayerWingDozer(params),
  });
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
  return new WingDozerTD(enemy.playerId, {
    wingDozer: EnemyWingDozer(params),
  });
}
