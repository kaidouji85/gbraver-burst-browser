// @flow

import * as THREE from 'three';
import type {Resources} from "../../../../resource";
import {TEXTURE_IDS} from "../../../../resource/texture";
import {SPRITE_RENDER_ORDER} from "../../../../render-order/td-render-order";
import type {ShockWaveLineModel} from "../model/shock-wave-model";

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
      model.distance * Math.cos(model.rotate),
      model.distance * Math.sin(model.rotate),
      0
    );
    this._mesh.rotation.z = model.rotate + Math.PI / 2;
    this._mesh.material.opacity = model.opacity;
    this._mesh.scale.set(
      model.scale.x,
      model.scale.y,
      1
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