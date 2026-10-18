import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

/** HUD パイロットオブジェクト */
export interface HUDPilotObjects {
  /** プレイヤーID */
  playerId: PlayerId;

  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[];
}
