// @flow

import * as THREE from 'three';
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {Resources} from "../../../resource";
import type {CanvasImageResource} from "../../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {drawImageInCenter} from "../../../canvas/draw/image-drawer";
import type {BurstButtonModel} from "../model/burst-button-model";

export const MESH_SIZE = 150;
export const CANVAS_SIZE = 512;

/** バーストボタンのビュー */
export class BurstButtonView {
  _canvasMesh: CanvasMesh;
  _resources: Resources;

  constructor(resources: Resources) {
    this._canvasMesh = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });
    this._resources = resources;
    this._draw();
  }

  /** モデルをビューに反映させる */
  engage(model: BurstButtonModel): void {
    this._setPos();
    this._setOpacity(model);
  }

  /** 本ビューで使うthree.jsオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._canvasMesh.mesh;
  }

  /** 表示位置を更新する */
  _setPos(): void {
    this._canvasMesh.mesh.position.x = (- window.innerWidth + MESH_SIZE) / 2;
    this._canvasMesh.mesh.position.y = (-window.innerHeight + MESH_SIZE) / 2;
  }

  /** 透明度を更新する */
  _setOpacity(model: BurstButtonModel): void {
    this._canvasMesh.setOpacity(model.opacity);
  }

  /** ボタンを描画する */
  _draw(): void {
    this._canvasMesh.draw(context => {
      context.clearRect(0, 0, context.canvas.height, context.canvas.height);
      context.save();

      const burstButtonResource: ?CanvasImageResource = this._resources.canvasImages
        .find(v => v.id === CANVAS_IMAGE_IDS.BURST_BUTTON);
      const burstButtonImage: Image = burstButtonResource ? burstButtonResource.image : new Image();
      const dx = context.canvas.width / 2;
      const dy = context.canvas.height / 2;
      drawImageInCenter(context, burstButtonImage, dx, dy);

      context.restore();
    });
  }
}