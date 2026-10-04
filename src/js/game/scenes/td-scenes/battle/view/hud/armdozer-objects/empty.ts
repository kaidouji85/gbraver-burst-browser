import { Player, PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import { HUDArmdozerObjects } from "./hud-armdozer-objects";

/**空のHUDレイヤーアームドーザオブジェクト */
export class EmptyHUDArmdozer implements HUDArmdozerObjects {
  /** @override */
  playerId: PlayerId;

  /**
   * コンストラクタ
   * @param state プレイヤーステート
   */
  constructor(state: Player) {
    this.playerId = state.playerId;
  }

  /** @override */
  destructor(): void {
    // NOP
  }

  /** @override */
  getObject3Ds(): THREE.Object3D[] {
    return [];
  }
}
