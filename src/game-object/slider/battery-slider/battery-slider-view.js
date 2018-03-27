// @flow

import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {Resources} from "../../../resource";
import type {BatterySliderModel} from "./battery-slider-model";
import {drawBatterySlider} from "../../../canvas/battery-slider";
import * as THREE from "three";

/** メッシュの大きさ */
export const MESH_SIZE = 360;

/** バッテリースライダーのビュー */
export class BatterySliderView {
  _canvasMesh: CanvasMesh;
  _resources: Resources;

  constructor(resources: Resources) {
    this._canvasMesh = new CanvasMesh({
      resources,
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
      canvasWidth: 512,
      canvasHeight: 512,
    });
    this._resources = resources;
  }

  /** ビューにモデルを反映させる */
  gameLoop(model: BatterySliderModel): void {
    this._refreshGauge(model);
    this._refreshPos();
  }

  /** バッテリースライダーを更新する */
  _refreshGauge(model: BatterySliderModel): void {
    this._canvasMesh.draw((context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, this._canvasMesh.canvas.width, this._canvasMesh.canvas.height);

      // TODO 開発が終わったら削除する
      /*
      context.save();
      context.fillStyle = 'red';
      context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      context.restore();
      */

      // バッテリースライダーが中央に描画されるようにする
      const dx = this._canvasMesh.canvas.width / 2;
      const dy = this._canvasMesh.canvas.height / 2;
      drawBatterySlider(context, this._resources, model.battery, model.maxBattery, dx, dy);
    });
  }

  /** 表示位置を更新する */
  _refreshPos(): void {
    this._canvasMesh.mesh.position.x = 0;
    this._canvasMesh.mesh.position.y = 0;
  }

  /** シーンに追加するthree.jsのオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._canvasMesh.getThreeJsObjectList();
  }
}