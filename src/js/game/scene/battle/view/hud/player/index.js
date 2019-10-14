// @flow

import type {PlayerId} from "gbraver-burst-core/lib/player/player";
import {Gauge} from "../../../../../../game-object/gauge/gauge";
import * as THREE from "three";

/** コンストラクタのパラメータ */
type Param = {
  playerId: PlayerId,
  gauge: Gauge,
};

/** HUDレイヤーのプレイヤー関連オブジェクト */
export class HUDPlayer {
  playerId: PlayerId;
  gauge: Gauge;

  constructor(param: Param) {
    this.playerId = param.playerId;
    this.gauge = param.gauge;
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.gauge.destructor();
  }

  /** HUDプレイヤーをシーンに追加するsuru */
  appendScene(scene: THREE.Scene): void {
    scene.add(this.gauge.getObject3D());
  }
}