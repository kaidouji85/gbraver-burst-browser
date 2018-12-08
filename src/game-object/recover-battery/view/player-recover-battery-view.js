// @flow

import * as THREE from 'three';
import type {RecoverBatteryView} from "./recover-battery-view";
import type {RecoverBatteryModel} from "../model/recover-battery-model";
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {CanvasImageResource} from "../../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import {drawNumberCenter} from "../../../canvas/number/number";
import type {Resources} from "../../../resource";
import {drawImageInCenter} from "../../../canvas/draw/image-drawer";

export const CANVAS_SIZE = 128;
export const MESH_SIZE = 180;

export class PlayerRecoverBatteryView implements RecoverBatteryView {
  _canvasMesh: CanvasMesh;
  _resources: Resources;
  _lastEngagedModel: ?RecoverBatteryModel;

  constructor(resources: Resources) {
    this._canvasMesh = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });
    this._resources = resources;
    this._lastEngagedModel = null;
  }

  engage(model: RecoverBatteryModel): void {
    if (this._shouldRefreshCanvas(model)) {
      this._refreshCanvas(model);
    }
    this._refreshPos();
    this._lastEngagedModel = model;
  }

  /** カメラの方向を向く */
  lookAt(camera: THREE.Camera): void {
    this._canvasMesh.mesh.quaternion.copy(camera.quaternion);
  }

  getObject3D(): THREE.Object3D {
    return this._canvasMesh.mesh;
  }

  _shouldRefreshCanvas(model: RecoverBatteryModel): boolean {
    if (!this._lastEngagedModel) {
      return true;
    }

    return model.value !== this._lastEngagedModel.value;
  }

  _refreshCanvas(model: RecoverBatteryModel): void {
    this._canvasMesh.draw(context => {
      // const batteryNumberResource: ?CanvasImageResource = this._resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_NUMBER);
      // const batteryNumber: Image = batteryNumberResource ? batteryNumberResource.image : new Image();
      // const numberSignResource: ?CanvasImageResource = this._resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_NUMBER_SIGN);
      // const numberSign: Image = numberSignResource ? numberSignResource.image : new Image();
      //
      // const x = context.canvas.width / 2;
      // const y = context.canvas.height / 2;

      context.clearRect(0, 0, context.canvas.height, context.canvas.height);
      // drawNumberCenter(context, batteryNumber, x+32, y, 3);
      // drawImageInCenter(context, numberSign, x, y);
    });
  }

  _refreshPos(): void {
    this._canvasMesh.mesh.position.x = 150;
    this._canvasMesh.mesh.position.y = 150;
    this._canvasMesh.mesh.position.z = 420;
  }
}