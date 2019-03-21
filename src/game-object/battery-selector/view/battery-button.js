// @flow
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {Resources} from "../../../resource";
import * as THREE from "three";
import type {CanvasImageResource} from "../../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {drawImageInCenter} from "../../../canvas/draw/image-drawer";


/** キャンバスサイズ */
export const CANVAS_SIZE = 1024;

/** メッシュサイズ */
export const MESH_SIZE = CANVAS_SIZE * 0.3;


/** バッテリーボタン */
export class BatteryButton {
  _mesh: CanvasMesh;
  _resources: Resources;

  constructor(resources: Resources) {
    this._resources = resources;
    this._mesh = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });
    this._draw();
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._mesh.getObject3D();
  }

  /** ボタンを描画する */
  _draw(): void {
    this._mesh.draw(context => {
      context.clearRect(0, 0, context.canvas.height, context.canvas.height);
      context.save();

      const buttonResource: ?CanvasImageResource = this._resources.canvasImages
        .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_SELECTOR_BUTTON);
      const ButtonImage: Image = buttonResource ? buttonResource.image : new Image();
      const dx = context.canvas.width / 2;
      const dy = context.canvas.height / 2;
      drawImageInCenter(context, ButtonImage, dx, dy);

      context.restore();
    });
  }
}