import type { Player, PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import type { HUDArmdozerObjects } from "./hud-armdozer-objects";

/**
 * 空のHUDレイヤーアームドーザ固有オブジェクト
 */
export class EmptyHUDArmdozer implements HUDArmdozerObjects {
  /** プレイヤーID */
  playerId: PlayerId;

  constructor(state: Player) {
    this.playerId = state.playerId;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    // NOP
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[] {
    return [];
  }
}
