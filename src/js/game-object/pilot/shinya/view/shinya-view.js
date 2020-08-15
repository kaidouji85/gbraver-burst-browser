// @flow

import * as THREE from 'three';
import type {Resources} from "../../../../resource";
import {TEXTURE_IDS} from "../../../../resource/texture";
import {HorizontalAnimationMesh} from "../../../../mesh/horizontal-animation";
import type {ShinyaModel} from "../model/shinya-model";

export const MESH_SIZE = 800;
export const MAX_ANIMATION = 1;

/**
 * シンヤ ビュー
 */
export class ShinyaView {
  _mesh: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const shinyaResource = resources.textures.find(v => v.id === TEXTURE_IDS.SHINYA_CUTIN);
    const shinya = shinyaResource?.texture ?? new THREE.Texture();
    this._mesh = new HorizontalAnimationMesh({
      texture: shinya,
      maxAnimation: MAX_ANIMATION,
      width: MESH_SIZE,
      height: MESH_SIZE,
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._mesh.destructor();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: ShinyaModel): void {
    // NOP
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