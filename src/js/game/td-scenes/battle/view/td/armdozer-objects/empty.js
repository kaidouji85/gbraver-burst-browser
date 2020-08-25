// @flow

import * as THREE from 'three';
import type {Player, PlayerId} from "gbraver-burst-core";
import type {TDArmdozerObjects} from "./armdozer-objects";

/**
 * 空の3Dレイヤーアームドーザ固有オブジェクト
 */
export class EmptyTDArmdozer implements TDArmdozerObjects {
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
  getObject3Ds(): typeof THREE.Object3D[] {
    return [];
  }

  /**
   * アームドーザスプライト配下に置かれるオブジェクトを取得する
   *
   * @return アームドーザスプライト配下に置かれるオブジェクト
   */
  getUnderSprite(): typeof THREE.Object3D[] {
    return [];
  }
}