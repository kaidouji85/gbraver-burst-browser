// @flow

import * as THREE from 'three';
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import type {Resources} from "../../../resource";
import {TEXTURE_IDS} from "../../../resource/texture";

const WIDTH = 200;
const HEIGHT = 200;
const MAX_ANIMATION = 8;

/**
 * 電撃バリア
 */
export class LightningBarrier {
  _mesh: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    const textureResource = resources.textures.find(v => v.id === TEXTURE_IDS.BARRIER_LIGHTNING);
    const texture = textureResource
      ? textureResource.texture
      : new THREE.Texture();
    this._mesh = new HorizontalAnimationMesh({
      texture: texture,
      maxAnimation: MAX_ANIMATION,
      width: WIDTH,
      height: HEIGHT,
    });
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