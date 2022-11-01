// @flow

import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import type { Resources } from "../../../resource";
import type { TextureId } from "../../../resource/texture/resource";
import type { ArmdozerAnimation } from "./armdozer-animation";

/** コンストラクタのパラメータ */
type Param = {
  /** テクスチャID */
  id: TextureId,
  /** リソース管理オブジェクト */
  resources: Resources,
  /** アニメーション枚数 */
  maxAnimation: number,
  /** 横 */
  width: number,
  /** 縦 */
  height: number,
};

/** アームドーザアニメーション水平方向テクスチャ版 */
export class HorizontalArmdozerAnimation implements ArmdozerAnimation {
  /** アニメーションメッシュ */
  #animation: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
  constructor(param: Param) {
    const textureResource = param.resources.textures.find(
      (v) => v.id === param.id
    );
    const texture = textureResource
      ? textureResource.texture
      : new THREE.Texture();
    this.#animation = new HorizontalAnimationMesh({
      texture: texture,
      maxAnimation: param.maxAnimation,
      width: param.width,
      height: param.height,
    });
  }

  /** @override */
  destructor(): void {
    this.#animation.destructor();
  }

  /** @override */
  animate(animation: number): void {
    this.#animation.animate(animation);
  }

  /** @override */
  visible(isVisible: boolean): void {
    this.#animation.mesh.material.opacity = isVisible ? 1 : 0;
  }

  /** @override */
  getObject3D(): typeof THREE.Object3D {
    return this.#animation.getObject3D();
  }
}
