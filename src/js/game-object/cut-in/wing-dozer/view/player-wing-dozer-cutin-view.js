// @flow

import type {WingDozerCutInView} from "./wing-dozer-cutin-view";
import type {Resources} from "../../../../resource";
import {HorizontalAnimationMesh} from "../../../../mesh/horizontal-animation";
import {TEXTURE_IDS} from "../../../../resource/texture";
import * as THREE from "three";
import type {WingDozerCutInModel} from "../model/wing-dozer-cutin-model";

/** メッシュの大きさ */
export const MESH_SIZE = 800;

/** ベースとなるpadding top */
export const BASE_PADDING_TOP = 100;

/**
 * プレイヤー側 ウィングドーザ　カットイン ビュー
 */
export class PlayerWingDozerCutInView implements WingDozerCutInView {
  _cutInDown: HorizontalAnimationMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const cutInDownResource = resources.textures
      .find(v => v.id === TEXTURE_IDS.WING_DOZER_BURST_UP);
    const cutInDown = cutInDownResource
      ? cutInDownResource.texture
      : new THREE.Texture();
    this._cutInDown = new HorizontalAnimationMesh({
      texture: cutInDown,
      width: MESH_SIZE,
      height: MESH_SIZE,
      maxAnimation: 4
    });
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._cutInDown.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._cutInDown.getObject3D();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: WingDozerCutInModel): void {
    // NOP
  }
}