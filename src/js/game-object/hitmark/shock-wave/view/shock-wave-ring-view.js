// @flow

import * as THREE from 'three';
import type {Resources} from "../../../../resource";
import {TEXTURE_IDS} from "../../../../resource/texture";
import {SPRITE_RENDER_ORDER} from "../../../../render-order/td-render-order";
import {RING_Z_INDEX} from "./z-index";
import type {ShockWaveRingModel} from "../model/shock-wave-model";

/** メッシュ幅 */
export const WIDTH = 200;
/** メッシュ高 */
export const HEIGHT = 200;

/**
 * 衝撃波リングのビュー
 */
export class ShockWaveRingView {
  _mesh: THREE.Mesh;

  constructor(resources: Resources) {
    const textureResource = resources.textures.find(v => v.id === TEXTURE_IDS.HITMARK_SHOCK_WAVE_RING);
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
    this._mesh.renderOrder = SPRITE_RENDER_ORDER;
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._mesh.geometry.dispose();
    this._mesh.material.dispose();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: ShockWaveRingModel): void {
    this._mesh.scale.set(
      model.scale,
      model.scale,
      model.scale
    );
    this._mesh.material.opacity = model.opacity;
    this._mesh.position.z = RING_Z_INDEX;
  }

  /**
   * シーンに追加するオブジェクトを返す
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._mesh;
  }
}