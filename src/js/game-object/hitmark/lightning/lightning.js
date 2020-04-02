// @flow

import * as THREE from 'three';
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import type {Resources} from "../../../resource";
import {TEXTURE_IDS} from "../../../resource/texture";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../armdozer/position";

const WIDTH = 300;
const HEIGHT = 300;
const MAX_ANIMATION = 8;

/**
 * 電撃ヒットマーク
 */
export class Lightning {
  _mesh: HorizontalAnimationMesh;
  
  constructor(resources: Resources) {
    const textureResource = resources.textures.find(v => v.id === TEXTURE_IDS.HITMARK_LIGHTNING_RING);
    const texture = textureResource
      ? textureResource.texture
      : new THREE.Texture();
    this._mesh = new HorizontalAnimationMesh({
      texture: texture,
      maxAnimation: MAX_ANIMATION,
      width: WIDTH,
      height: HEIGHT,
    });

    // TODO Updade時に実施する
    const target = this._mesh.getObject3D();
    target.position.set(
      ARMDOZER_EFFECT_STANDARD_X,
      ARMDOZER_EFFECT_STANDARD_Y,
      ARMDOZER_EFFECT_STANDARD_Z,
    );
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._mesh.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._mesh.getObject3D();
  }
}