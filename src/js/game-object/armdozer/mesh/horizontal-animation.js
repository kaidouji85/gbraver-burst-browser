// @flow
import * as THREE from "three";
import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import type { Resources } from "../../../resource";
import type { TextureId } from "../../../resource/texture/resource";
import type { ArmdozerAnimation } from "./armdozer-animation";

type Param = {
  id: TextureId,
  resources: Resources,
  maxAnimation: number,
  width: number,
  height: number,
};

/** アームドーザアニメーション水平方向テクスチャ版 */
export class HorizontalArmdozerAnimation implements ArmdozerAnimation {
  #animation: HorizontalAnimationMesh;

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

  /** デストラクタ */
  destructor(): void {
    this.#animation.destructor();
  }

  /** アニメーション進捗を変更する */
  animate(animation: number): void {
    this.#animation.animate(animation);
  }

  /** 表示、非表示を設定する */
  visible(isVisible: boolean): void {
    this.#animation.mesh.material.opacity = isVisible ? 1 : 0;
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): typeof THREE.Object3D {
    return this.#animation.getObject3D();
  }
}
