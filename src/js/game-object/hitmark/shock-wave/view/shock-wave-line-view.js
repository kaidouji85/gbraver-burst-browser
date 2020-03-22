// @flow

import * as THREE from 'three';
import type {Resources} from "../../../../resource";
import {TEXTURE_IDS} from "../../../../resource/texture";
import {SPRITE_RENDER_ORDER} from "../../../../render-order/td-render-order";
import type {ShockWaveLineModel} from "../model/shock-wave-model";
import {LINE_Z_INDEX} from "./z-index";

export const HEIGHT = 100;
export const WIDTH = 100;

/**
 * プレイヤーの衝撃波ビュー
 */
export class ShockWaveLineView {
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
  engage(model: ShockWaveLineModel): void {
    this._mesh.position.set(
      (model.distance + WIDTH / 2) * Math.cos(model.rotate),
      (model.distance + HEIGHT / 2) * Math.sin(model.rotate),
      LINE_Z_INDEX
    );
    this._mesh.rotation.z = model.rotate;
    this._mesh.material.opacity = model.opacity;
    this._mesh.scale.set(
      model.scale,
      model.scale,
      model.scale
    );
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