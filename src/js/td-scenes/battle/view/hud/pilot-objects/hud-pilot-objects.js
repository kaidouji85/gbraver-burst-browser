// @flow

import type {PlayerId} from "gbraver-burst-core";
import * as THREE from "three";

/**
 * HUD パイロット関連オブジェクト
 */
export interface HUDPilotObjects {
  /**
   * プレイヤーID
   */
  playerId: PlayerId;

  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): typeof THREE.Object3D[];
}