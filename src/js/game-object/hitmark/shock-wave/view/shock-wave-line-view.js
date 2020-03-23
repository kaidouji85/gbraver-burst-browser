// @flow

import * as THREE from 'three';
import type {Resources} from "../../../../resource";
import {TEXTURE_IDS} from "../../../../resource/texture";
import {SPRITE_RENDER_ORDER} from "../../../../render-order/td-render-order";
import type {ShockWaveLineModel} from "../model/shock-wave-model";
import {LINE_Z_INDEX} from "./z-index";

/** メッシュ幅 */
export const WIDTH = 100;
/** メッシュ高 */
export const HEIGHT = 100;

/**
 * プレイヤーの衝撃波ビュー
 */
export class ShockWaveLineView {
  _mesh: THREE.Mesh;
  _group: THREE.Group;

  constructor(resources: Resources) {
    this._group = new THREE.Group();

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
    this._mesh.position.x = WIDTH / 2;
    this._group.add(this._mesh);
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._mesh.material.dispose();
    this._mesh.geometry.dispose();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: ShockWaveLineModel): void {
    this._mesh.material.opacity = model.opacity;

    this._group.position.set(
      model.distance * Math.cos(model.rotate),
      model.distance * Math.sin(model.rotate),
      LINE_Z_INDEX
    );
    this._group.rotation.z = model.rotate;
    this._group.scale.set(
      model.scale,
      1,
      1
    );
  }
  /**
   * シーンに追加するオブジェクトを返す
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D() {
    return this._group;
  }
}