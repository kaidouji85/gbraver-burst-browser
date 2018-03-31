// @flow

import {CanvasMesh} from "../../../../mesh/canvas-mesh";
import type {Resources} from "../../../../resource/index";
import type {BatterySliderModel} from "../battery-slider-model";
import {drawBatterySlider} from "../../../../canvas/battery-slider/index";
import * as THREE from "three";
import {TouchLocation} from "./touch-location";

/** メッシュの大きさ */
export const MESH_SIZE = 360;
/** スライダーのスタート値 */
export const START_VALUE = 0;
/** スライダーのエンド値 */
export const END_VALUE = 5;

/** バッテリースライダーのビュー */
export class BatterySliderView {
  /** バッテリースライダーを描画するキャンバス */
  _canvasMesh: CanvasMesh;
  /** バッテリースライダーメーターの当たり判定 */
  _touchLocation: TouchLocation;
  /** ゲームループで使うためにリソース管理オブジェクトをキャッシュする */
  _resources: Resources;

  constructor(resources: Resources) {
    this._canvasMesh = new CanvasMesh({
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
      canvasWidth: 512,
      canvasHeight: 512,
    });
    this._touchLocation = new TouchLocation({
      width: 340,
      height: 100,
      start: START_VALUE,
      end: END_VALUE,
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
    return [
      ...(this._canvasMesh.getThreeJsObjectList()),
      ...(this._touchLocation.getThreeJsObjectList())
    ];
  }
}