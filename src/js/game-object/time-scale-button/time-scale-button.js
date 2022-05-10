// @flow
import * as THREE from 'three';
import type {Resources} from "../../resource";
import {CANVAS_IMAGE_IDS} from "../../resource/canvas-image";
import {SimpleImageMesh} from "../../mesh/simple-image-mesh";

/** canvasサイズ */
const CANVAS_SIZE = 256;

/** メッシュサイズ */
const MESH_SIZE = 100;

/** アニメーションタイムスケールボタン */
export class TimeScaleButton {
  _button: SimpleImageMesh;

  /**
   * コンストラクタ
   *
   * @param resources リソース管理オブジェクト
   */
  constructor(resources: Resources) {
    const buttonImage = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.TIME_SCALE_BUTTON)?.image ?? new Image();
    this._button = new SimpleImageMesh({canvasSize: CANVAS_SIZE, meshSize: MESH_SIZE, image: buttonImage, imageWidth: 256});
    this._button.getObject3D().position.x = 0;
    this._button.getObject3D().position.y = 0;
  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): typeof THREE.Object3D {
    return this._button.getObject3D();
  }
}