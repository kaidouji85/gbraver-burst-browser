import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

/**
 * HUDレイヤー アームドーザ固有のオブジェクトを集めたもの
 */
export interface HUDArmdozerObjects {
  playerId: PlayerId;

  /** デストラクタ相当の処理 */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[];
}
