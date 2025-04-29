import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import { Resources } from "../../../../resource";
import { findTextureOrThrow } from "../../../../resource/find-texture-or-throw";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import { LightningModel } from "../model/lightning-model";
import { LightningView } from "./lightning-view";

/** メッシュ幅 */
const WIDTH = 350;

/** メッシュ高 */
const HEIGHT = 350;

/** アニメーション数 */
const MAX_ANIMATION = 8;

/**
 * プレイヤー側 電撃ヒットマーク ビュー
 */
export class PlayerLightningView implements LightningView {
  #mesh: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    const { texture } = findTextureOrThrow(
      resources,
      TEXTURE_IDS.HITMARK_LIGHTNING_RING,
    );
    this.#mesh = new HorizontalAnimationMesh({
      texture: texture,
      maxAnimation: MAX_ANIMATION,
      width: WIDTH,
      height: HEIGHT,
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this.#mesh.destructor();
  }

  /**
   * モデルをビューに反映する
   *
   * @param model モデル
   */
  engage(model: LightningModel): void {
    const object3D = this.#mesh.getObject3D();
    object3D.position.set(model.position.x, model.position.y, model.position.z);
    object3D.scale.set(1, 1, 1);
    this.#mesh.opacity(model.opacity);
    this.#mesh.animate(model.animation.frame);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @returns シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this.#mesh.getObject3D();
  }
}
