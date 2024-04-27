import * as THREE from "three";

import { HorizontalAnimationMesh } from "../../../../mesh/horizontal-animation";
import type { Resources } from "../../../../resource";
import { TEXTURE_IDS } from "../../../../resource/texture/ids";
import type { LightningBarrierModel } from "../model/lightning-barrier-model";

/** メッシュ幅 */
const WIDTH = 500;

/** メッシュ高 */
const HEIGHT = 500;

/** アニメーション数 */
const MAX_ANIMATION = 8;

/**
 * 電撃バリアビュー
 */
export class LightningBarrierView {
  #mesh: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    const textureResource = resources.textures.find(
      (v) => v.id === TEXTURE_IDS.BARRIER_LIGHTNING,
    );
    const texture = textureResource
      ? textureResource.texture
      : new THREE.Texture();
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
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: LightningBarrierModel): void {
    const target = this.getObject3D();
    target.position.set(model.position.x, model.position.y, model.position.z);
    target.scale.set(model.scale, model.scale, model.scale);
    this.#mesh.opacity(model.opacity);
    this.#mesh.animate(model.animation.frame);
  }

  /**
   * カメラの真正面を向く
   *
   * @param camera カメラ
   */
  lookAt(camera: THREE.Camera): void {
    this.getObject3D().quaternion.copy(camera.quaternion);
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
