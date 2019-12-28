// @flow

import * as THREE from 'three';
import type {BurstIndicatorView} from "./burst-indicator-view";
import type {BurstIndicatorModel} from "../model/burst-indicator-model";
import type {Resources} from "../../../resource";
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {
  ARMDOZER_EFFECT_STANDARD_X,
  ARMDOZER_EFFECT_STANDARD_Y,
  ARMDOZER_EFFECT_STANDARD_Z
} from "../../armdozer/position";

export const CANVAS_SIZE = 512;
export const MESH_SIZE = 400;

/**
 * プレイヤーバーストインジケータビュー
 */
export class PlayerBurstIndicatorView implements BurstIndicatorView {
  _mesh: SimpleImageMesh;

  constructor(resources: Resources) {
    const imageResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BURST);
    const image: Image = imageResource
      ? imageResource.image
      : new Image();
    this._mesh = new SimpleImageMesh({
      image: image,
      meshSize: MESH_SIZE,
      canvasSize: CANVAS_SIZE,
    });
  }

  /** デストラクタ相当の処理*/
  destructor(): void {
    this._mesh.destructor();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: BurstIndicatorModel): void {
    this._setPosition();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._mesh.getObject3D();
  }

  /** 座標を設定する */
  _setPosition(): void {
    this._mesh.getObject3D().position.x = ARMDOZER_EFFECT_STANDARD_X;
    this._mesh.getObject3D().position.y = ARMDOZER_EFFECT_STANDARD_Y;
    this._mesh.getObject3D().position.z = ARMDOZER_EFFECT_STANDARD_Z;
  }
}
