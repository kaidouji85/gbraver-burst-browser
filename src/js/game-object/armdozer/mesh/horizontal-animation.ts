import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../mesh/horizontal-animation";
import type { ArmdozerAnimation } from "./armdozer-animation";

/** コンストラクタのパラメータ */
type ConstructorParam = {
  /** テクスチャ */
  texture: THREE.Texture;
  /** アニメーション枚数 */
  maxAnimation: number;
  /** 横 */
  width: number;
  /** 縦 */
  height: number;
  /** ブレンドモード */
  blending?: THREE.Blending;
};

/** アームドーザアニメーション水平方向テクスチャ版 */
class HorizontalArmdozerAnimation implements ArmdozerAnimation {
  /** アニメーションメッシュ */
  #animation: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   * @param param パラメータ
   */
  constructor(param: ConstructorParam) {
    this.#animation = new HorizontalAnimationMesh({
      texture: param.texture,
      maxAnimation: param.maxAnimation,
      width: param.width,
      height: param.height,
      blending: param.blending,
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
  opacity(value: number): void {
    this.#animation.mesh.material.opacity = value;
  }

  /** @override */
  getObject3D(): THREE.Object3D {
    return this.#animation.getObject3D();
  }
}

/** createHorizontalAnimationのパラメータ */
type CreatorParam = ConstructorParam;

/**
 * HorizontalArmdozerAnimationを生成する
 * @param param パラメータ
 * @return 生成結果
 */
export function createHorizontalAnimation(
  param: CreatorParam
): ArmdozerAnimation {
  return new HorizontalArmdozerAnimation(param);
}
