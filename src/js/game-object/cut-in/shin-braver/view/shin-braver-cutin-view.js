// @flow

import * as THREE from 'three';
import type {CutIn} from "../../cut-in";
import {HorizontalAnimationMesh} from "../../../../mesh/horizontal-animation";
import type {Resources} from "../../../../resource";
import {TEXTURE_IDS} from "../../../../resource/texture";
import type {ShinBraverCutInModel} from "../model/shin-braver-cutin-model";

/** メッシュの大きさ */
export const MESH_SIZE = 200;

/**
 * シンブレイバーカットインのビュー
 */
export class ShinBraverCutInView implements CutIn {
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
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: ShinBraverCutInModel): void {
    // NOP
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