// @flow

import * as THREE from 'three';
import type {TDArmdozer} from "./index";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";

/**
 * 空の3Dレイヤーアームドーザ固有オブジェクト
 */
export class EmptyTDArmdozer implements TDArmdozer {
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

  /**
   * アームドーザスプライト配下に置かれるオブジェクトを取得する
   *
   * @return アームドーザスプライト配下に置かれるオブジェクト
   */
  getUnderSprite(): THREE.Object3D[] {
    return [];
  }
}