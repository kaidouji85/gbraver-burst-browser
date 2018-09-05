// @flow

import type {BatteryNumberView} from "./battery-number-view";
import type {BatteryNumberModel} from "../model/battery-number-model";
import type {Resources} from "../../../resource";
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import {drawNumberCenter} from "../../../canvas/number/number";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import type {CanvasImageResource} from "../../../resource/canvas-image";
import * as THREE from 'three';

export const CANVAS_SIZE = 2048;
export const MESH_SIZE = 2048;
export const SCALE = 1;

/** プレイヤーのバッテリー数字ビュー */
export class PlayerBatteryNumberView implements BatteryNumberView {
  _resources: Resources;
  _canvasMesh: CanvasMesh;

  constructor(resources: Resources) {
    this._resources = resources;
    this._canvasMesh = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });
  }

  /** モデルをビューに反映させる */
  engage(model: BatteryNumberModel, camera: THREE.Camera): void {
    this._refreshCanvas(model);
    this._refreshPos();
    this._refreshQuaternion(camera);
    this._refreshScale();
  }

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this._canvasMesh.mesh;
  }

  /** キャンバス内容を更新する */
  _refreshCanvas(model: BatteryNumberModel): void {
    this._canvasMesh.draw(context => {
      const batteryNumberResource: ?CanvasImageResource = this._resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_NUMBER);
      const batteryNumber: Image = batteryNumberResource ? batteryNumberResource.image : new Image();
      const x = context.canvas.width / 2;
      const y = context.canvas.height / 2;

      context.save();

      //context.fillRect(0, 0, context.canvas.height, context.canvas.height);
      context.clearRect(0, 0, context.canvas.height, context.canvas.height);
      drawNumberCenter(context, batteryNumber, x, y, 5);

      context.restore();
    });
  }

  /** 座標を更新する */
  _refreshPos(): void {
    this._canvasMesh.mesh.position.x = 150;
    this._canvasMesh.mesh.position.y = 200;
    this._canvasMesh.mesh.position.z = 400;
  }

  /** メッシュのクォータニオンを更新する */
  _refreshQuaternion(camera: THREE.Camera): void {
    this._canvasMesh.mesh.quaternion.copy(camera.quaternion);
  }

  /** スケールを更新する */
  _refreshScale(): void {
    this._canvasMesh.mesh.scale.set(SCALE, SCALE, SCALE)
  }
}
