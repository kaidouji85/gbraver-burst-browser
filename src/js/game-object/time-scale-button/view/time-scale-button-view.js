// @flow
import * as THREE from 'three';
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {SimpleImageMesh} from "../../../mesh/simple-image-mesh";
import type {TimeScaleButtonModel} from "../model/time-scale-button-model";

/** canvasサイズ */
const CANVAS_SIZE = 256;

/** メッシュサイズ */
const MESH_SIZE = 100;

/** アニメーションタイムスケールボタンビュー */
export class TimeScaleButtonView {
  _button: SimpleImageMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const buttonImage = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.TIME_SCALE_BUTTON)?.image ?? new Image();
    this._button = new SimpleImageMesh({canvasSize: CANVAS_SIZE, meshSize: MESH_SIZE, image: buttonImage, imageWidth: 256});
  }

  /**
   * デストラクタ相当の処理
   */
  destructor(): void {
    this._button.destructor();
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this._button.getObject3D();
  }

  /**
   * モデルをビューに反映させる
   *
   * @param model モデル
   */
  engage(model: TimeScaleButtonModel): void {
    console.log(model);
  }
}