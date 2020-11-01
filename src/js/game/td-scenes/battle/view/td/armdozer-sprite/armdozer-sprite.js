// @flow

import type {PlayerId} from "gbraver-burst-core";
import type {ArmDozerSprite} from "../../../../../../game-object/armdozer/armdozer-sprite";
import * as THREE from "three";

// TODO 削除する
/**
 * アームドーザ スプライト
 */
export class TDArmdozerSprite {
  playerId: PlayerId;
  sprite: ArmDozerSprite;

  constructor(playerId: PlayerId, sprite: ArmDozerSprite) {
    this.playerId = playerId;
    this.sprite = sprite;
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.sprite.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3Ds(): typeof THREE.Object3D[] {
    return [
      this.sprite.getObject3D()
    ];
  }
}