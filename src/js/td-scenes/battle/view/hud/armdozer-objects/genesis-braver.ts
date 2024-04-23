import { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyGenesisBraverCutIn,
  playerGenesisBraverCutIn,
} from "../../../../../game-object/cut-in/genesis-braver";
import { GenesisBraverCutIn } from "../../../../../game-object/cut-in/genesis-braver/genesis-braver-cutin";
import { HUDLayerObjectCreatorParams } from "../creator-params";
import { HUDArmdozerObjects } from "./hud-armdozer-objects";

/** HUDレイヤー ジェネシスブレイバー固有オブジェクト */
export class GenesisBraverHUD implements HUDArmdozerObjects {
  /**
   * コンストラクタ
   * @param param パラメータ
   * @param cutIn カットイン
   */
  constructor(
    readonly playerId: PlayerId,
    readonly cutIn: GenesisBraverCutIn,
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
 * プレイヤー ジェネシスブレイバーHUD を生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function playerGenesisBraverHUD(
  params: HUDLayerObjectCreatorParams,
): HUDArmdozerObjects {
  const { player } = params;
  return new GenesisBraverHUD(
    player.playerId,
    playerGenesisBraverCutIn(params),
  );
}

/**
 * 敵 ジェネシスブレイバーHUD を生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyGenesisBraverHUD(
  params: HUDLayerObjectCreatorParams,
): HUDArmdozerObjects {
  const { enemy } = params;
  return new GenesisBraverHUD(enemy.playerId, enemyGenesisBraverCutIn(params));
}
