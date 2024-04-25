import type { PlayerId } from "gbraver-burst-core";
import * as THREE from "three";

import type { ArmdozerSprite } from "../../../../../game-object/armdozer/armdozer-sprite";

/**
 * 3Dレイヤー アームドーザ固有のオブジェクトを集めたもの
 */
export interface TDArmdozerObjects {
  /** プレイヤーID */
  playerId: PlayerId;

  /**
   * デストラクタ相当の処理
   */
  destructor(): void;

  /**
   * アームドーザスプライトにダウンキャストする
   * @returns アームドーザスプライト
   */
  sprite(): ArmdozerSprite;

  /**
   * シーンに追加するオブジェクトを取得する
   * @returns シーンに追加するオブジェクト
   */
  getObject3Ds(): THREE.Object3D[];
}
