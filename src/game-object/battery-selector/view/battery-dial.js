// @flow
import type {Resources} from "../../../resource";
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import * as THREE from "three";
import type {CanvasImageResource} from "../../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {drawImageInCenter} from "../../../canvas/draw/image-drawer";

/** メッシュサイズ */
export const MESH_SIZE = 150;

/** キャンバスサイズ */
export const CANVAS_SIZE = 512;

/** バッテリーダイヤル */
export class BatteryDial {
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

  /** ダイヤルを描画する */
  _draw(): void {
    this._mesh.draw(context => {
      context.clearRect(0, 0, context.canvas.height, context.canvas.height);
      context.save();

      const dialResource: ?CanvasImageResource = this._resources.canvasImages
        .find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_SELECTOR_DIAL);
      const dialImage: Image = dialResource ? dialResource.image : new Image();
      const dx = context.canvas.width / 2;
      const dy = context.canvas.height / 2;
      drawImageInCenter(context, dialImage, dx, dy);

      context.restore();
    });
  }
}