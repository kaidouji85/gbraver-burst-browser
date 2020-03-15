// @flow

import * as THREE from 'three';
import type {CutIn} from "../cut-in";
import {Animate} from "../../../animation/animate";
import {empty} from "../../../animation/delay";
import type {Resources} from "../../../resource";
import {HorizontalAnimationMesh} from "../../../mesh/horizontal-animation";
import {TEXTURE_IDS} from "../../../resource/texture";

/** メッシュの大きさ */
export const MESH_SIZE = 200;

/**
 * シンブレイバーカットイン
 */
export class ShinBraverCutIn implements CutIn {
  _charge: HorizontalAnimationMesh;

  constructor(resources: Resources) {
    const burstChargeResource = resources.textures.find(v => v.id === TEXTURE_IDS.SHIN_BRAVER_BURST_CHARGE);
    const burstCharge = burstChargeResource
      ? burstChargeResource.texture
      : new THREE.Texture();
    this._charge = new HorizontalAnimationMesh({
      texture: burstCharge,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: 4
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._charge.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._charge.getObject3D();
  }
}