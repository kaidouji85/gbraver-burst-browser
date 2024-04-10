import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import type { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";
import {
  EnemyShinBraver,
  PlayerShinBraver,
} from "../../../../../game-object/armdozer/shin-braver";
import { ShinBraver } from "../../../../../game-object/armdozer/shin-braver/shin-braver";
import type { TDArmdozerObjects } from "./armdozer-objects";
import {GenerateTDLayerObjectParams} from "../generate-params";

/**3Dレイヤー シンブレイバー 3Dレイヤー フィールド */
interface ShinBraverTDField {
  /** シンブレイバー */
  shinBraver: ShinBraver;
}

/** シンブレイバー 3Dレイヤー */
export class ShinBraverTD implements ShinBraverTDField, TDArmdozerObjects {
  /** @override */
  playerId: PlayerId;

  /** @override */
  shinBraver: ShinBraver;

  /**
   * コンストラクタ
   * @param playerId プレイヤーID
   * @param field フィールド
   */
  constructor(playerId: PlayerId, field: ShinBraverTDField) {
    this.playerId = playerId;
    this.shinBraver = field.shinBraver;
  }

  /** @override */
  destructor(): void {
    this.shinBraver.destructor();
  }

  /** @override */
  sprite(): ArmdozerSprite {
    return this.shinBraver;
  }

  /** @override */
  getObject3Ds(): THREE.Object3D[] {
    return [this.shinBraver.getObject3D()];
  }
}

/**
 * プレイヤー シンブレイバー 3Dレイヤー
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerShinBraverTD(
  params: GenerateTDLayerObjectParams
): ShinBraverTD {
  const { player } = params;
  return new ShinBraverTD(player.playerId, {
    shinBraver: PlayerShinBraver(params),
  });
}

/**
 * 敵 シンブレイバー 3Dレイヤー
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyShinBraverTD(
  params: GenerateTDLayerObjectParams
): ShinBraverTD {
  const { enemy } = params;
  return new ShinBraverTD(enemy.playerId, {
    shinBraver: EnemyShinBraver(params),
  });
}
