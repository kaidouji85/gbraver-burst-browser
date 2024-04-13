import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import {
  enemyGenesisBraverCutIn,
  playerGenesisBraverCutIn,
} from "../../../../../game-object/cut-in/genesis-braver";
import { GenesisBraverCutIn } from "../../../../../game-object/cut-in/genesis-braver/genesis-braver-cutin";
import { GenerateHUDLayerObjectParams } from "../generate-params";
import type { HUDArmdozerObjects } from "./hud-armdozer-objects";

/** コンストラクタのパラメータ */
type Param = {
  /** プレイヤーID */
  playerId: PlayerId;
  /** カットイン */
  cutIn: GenesisBraverCutIn;
};

/** HUDレイヤー ジェネシスブレイバー固有オブジェクト */
export class GenesisBraverHUD implements HUDArmdozerObjects {
  /** @override */
  playerId: PlayerId;
  /** カットイン */
  cutIn: GenesisBraverCutIn;

  /**
   * コンストラクタ
   * @param param パラメータ
   */
  constructor(param: Param) {
    this.playerId = param.playerId;
    this.cutIn = param.cutIn;
  }

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
  params: GenerateHUDLayerObjectParams,
): HUDArmdozerObjects {
  const { player } = params;
  return new GenesisBraverHUD({
    playerId: player.playerId,
    cutIn: playerGenesisBraverCutIn(params),
  });
}

/**
 * 敵 ジェネシスブレイバーHUD を生成する
 * @param params 生成パラメータ
 * @return 生成結果
 */
export function enemyGenesisBraverHUD(
  params: GenerateHUDLayerObjectParams,
): HUDArmdozerObjects {
  const { enemy } = params;
  return new GenesisBraverHUD({
    playerId: enemy.playerId,
    cutIn: enemyGenesisBraverCutIn(params),
  });
}
