// @flow

import type {LightningView} from "./lightning-view";
import {HorizontalAnimationMesh} from "../../../../mesh/horizontal-animation";
import type {Resources} from "../../../../resource";
import {TEXTURE_IDS} from "../../../../resource/texture";
import * as THREE from "three";
import type {LightningModel} from "../model/lightning-model";

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
  _mesh: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    const textureResource = resources.textures.find(v => v.id === TEXTURE_IDS.HITMARK_LIGHTNING_RING);
    const texture = textureResource
      ? textureResource.texture
      : new THREE.Texture();
    this._mesh = new HorizontalAnimationMesh({
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
    this._mesh.destructor();
  }

  /**
   * モデルをビューに反映する
   *
   * @param model モデル
   */
  engage(model: LightningModel): void {
    const object3D = this._mesh.getObject3D();
    object3D.position.set(
      model.position.x,
      model.position.y,
      model.position.z,
    );
    object3D.scale.set(1, 1, 1);
    this._mesh.setOpacity(model.opacity);
    this._mesh.animate(model.animation.frame);
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