// @flow

import type {Resources} from "../../../../resource";
import {HorizontalAnimationMesh} from "../../../../mesh/horizontal-animation";
import * as THREE from "three";
import {TEXTURE_IDS} from "../../../../resource/texture";
import type {LightningDozerCutInView} from "./lightning-dozer-cutin-view";
import type {LightningDozerCutInModel} from "../model/lightning-dozer-cutin-model";

/** メッシュの大きさ */
export const MESH_SIZE = 800;

/**
 * プレイヤー ライトニングドーザ カットイン
 */
export class PlayerLightningDozerCutInView implements LightningDozerCutInView {
  _cutInUp: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const cutInUpResource = resources.textures
      .find(v => v.id === TEXTURE_IDS.LIGHTNING_DOZER_CUTIN_UP);
    const cutInUp = cutInUpResource
      ? cutInUpResource.texture
      : new THREE.Texture();
    this._cutInUp = new HorizontalAnimationMesh({
      texture: cutInUp,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: 4
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._cutInUp.destructor();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: LightningDozerCutInModel): void {
    const target = this.getObject3D();

    target.position.x = model.tracking.x;
    target.position.y = model.tracking.y;

    target.scale.set(model.scale, model.scale, model.scale);
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._cutInUp.getObject3D();
  }
}