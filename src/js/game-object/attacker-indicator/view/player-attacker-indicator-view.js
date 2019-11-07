// @flow

import * as THREE from "three";
import type {AttackerIndicatorView} from "./attacker-indicator-view";
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {Resources} from "../../../resource";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {drawImageInCenter} from "../../../canvas/draw/image-drawer";
import type {AttackerIndicatorModel} from "../model/attacker-indicator-model";

export const MESH_SIZE = 256;
export const CANVAS_SIZE = 256;

/** プレイヤー側アタッカーインジケータのビュー */
export class PlayerAttackerIndicatorView implements AttackerIndicatorView {
  _canvas: CanvasMesh;

  constructor(resources: Resources) {
    this._canvas = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });

    const indicatorResource = resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.ATTACKER_INDICATOR);
    const indicator: Image = indicatorResource
      ? indicatorResource.image
      : new Image();
    this._canvas.draw(context => {
      drawImageInCenter(context, indicator, 0, 0);
    });
  }

  /** モデルをビューに反映させる */
  engage(model: AttackerIndicatorModel): void {

  }

  /**
   * シーンに追加するオブジェクトを取得する
   *
   * @return シーンに追加するオブジェクト
   */
  getObject3D(): THREE.Object3D {
    return this._canvas.getObject3D();
  }
}