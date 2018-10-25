// @flow

import type {BatteryNumberView} from "./battery-number-view";
import type {BatteryNumberModel} from "../model/battery-number-model";
import type {Resources} from "../../../resource";
import {CanvasMesh} from "../../../mesh/canvas-mesh";
import {drawNumberCenter} from "../../../canvas/number/number";
import type {CanvasImageResource} from "../../../resource/canvas-image";
import {CANVAS_IMAGE_IDS} from "../../../resource/canvas-image";
import * as THREE from 'three';
import * as R from 'ramda';

export const CANVAS_SIZE = 128;
export const MESH_SIZE = 180;

/** プレイヤーのバッテリー数字ビュー */
export class PlayerBatteryNumberView implements BatteryNumberView {
  _resources: Resources;
  _canvasMesh: CanvasMesh;
  _lastEngagedModel: ?BatteryNumberModel;

  constructor(resources: Resources) {
    this._resources = resources;
    this._canvasMesh = new CanvasMesh({
      canvasWidth: CANVAS_SIZE,
      canvasHeight: CANVAS_SIZE,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
    });
    this._lastEngagedModel = null;
  }

  /** モデルをビューに反映させる */
  engage(model: BatteryNumberModel): void {
    if (this._shouldCanvasRefresh(model)) {
      this._refreshCanvas(model);
    }
    this._refreshPos();
    this._refreshOpacity(model);
    this._updateLastEngagedModel(model);
  }

  /** カメラの方向を向く */
  lookAt(camera: THREE.Camera): void {
    this._canvasMesh.mesh.quaternion.copy(camera.quaternion);
  }

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this._canvasMesh.getObject3D();
  }

  /** キャンバスを更新するか否かを判定する、trueで更新する */
  _shouldCanvasRefresh(model: BatteryNumberModel): boolean {
    if (!this._lastEngagedModel) {
      return true;
    }

    return this._lastEngagedModel.battery !== model.battery;
  }

  /** キャンバス内容を更新する */
  _refreshCanvas(model: BatteryNumberModel): void {
    this._canvasMesh.draw(context => {
      const batteryNumberResource: ?CanvasImageResource = this._resources.canvasImages.find(v => v.id === CANVAS_IMAGE_IDS.BATTERY_NUMBER);
      const batteryNumber: Image = batteryNumberResource ? batteryNumberResource.image : new Image();
      const x = context.canvas.width / 2;
      const y = context.canvas.height / 2;

      context.clearRect(0, 0, context.canvas.height, context.canvas.height);
      drawNumberCenter(context, batteryNumber, x, y, model.battery);
    });
  }

  /** 座標を更新する */
  _refreshPos(): void {
    this._canvasMesh.mesh.position.x = 150;
    this._canvasMesh.mesh.position.y = 150;
    this._canvasMesh.mesh.position.z = 420;
  }

  /** 透明度を更新する */
  _refreshOpacity(model: BatteryNumberModel): void {
    this._canvasMesh.setOpacity(model.alpha);
  }

  /** 最後にビューに反映されたモデルを、引数の内容で上書きする */
  _updateLastEngagedModel(model: BatteryNumberModel): void {
    this._lastEngagedModel = R.clone(model);
  }
}
