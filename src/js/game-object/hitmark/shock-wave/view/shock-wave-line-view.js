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
 * 軌跡メッシュの共通リソース
 * 軌跡メッシュのマテリアル 、ジオメトリーは全て同じなので、
 * 1回だけ生成してそれを使い回す
 */
export class LineMeshResource {
  material: THREE.Material;
  geometry: THREE.Geometry;

  constructor(resources: Resources) {
    const textureResource = resources.textures.find(v => v.id === TEXTURE_IDS.HITMARK_SHOCK_WAVE_LINE);
    const texture = textureResource
      ? textureResource.texture
      : new THREE.Texture();
    this.material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      map: texture
    });
    this.geometry = new THREE.PlaneGeometry(WIDTH, HEIGHT, 1, 1);
  }

  /** デストラクタ相当の処理 */
  destructor(): void {
    this.material.dispose();
    this.geometry.dispose();
  }
}

/**
 * プレイヤーの衝撃波ビュー
 */
export class ShockWaveLineView {
  _mesh: THREE.Mesh;

  constructor(resources: LineMeshResource) {
    this._mesh = new THREE.Mesh(resources.geometry, resources.material);
    this._mesh.renderOrder = SPRITE_RENDER_ORDER;
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