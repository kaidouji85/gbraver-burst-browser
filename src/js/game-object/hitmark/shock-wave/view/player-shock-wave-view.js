// @flow

import * as THREE from 'three';
import type {ShockWaveView} from "./shock-wave-view";
import type {Resources} from "../../../../resource";
import {TEXTURE_IDS} from "../../../../resource/texture";

export const HEIGHT = 200;
export const WIDTH = 200;

/**
 * プレイヤーの衝撃波ビュー
 */
export class PlayerShockWaveView implements ShockWaveView {
  _mesh: THREE.Mesh;

  constructor(resources: Resources) {
    const textureResource = resources.textures.find(v => v.id === TEXTURE_IDS.HITMARK_SHOCK_WAVE_LINE);
    const texture = textureResource
      ? textureResource.texture
      : new THREE.Texture();
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      map: texture
    });

    const geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 1, 1);

    this._mesh = new THREE.Mesh(geometry, material);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._mesh.geometry.dispose();
    this._mesh.material.dispose();
  }

  /**
   * シーンに追加するオブジェクトを返す
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D() {
    return this._mesh;
  }
}