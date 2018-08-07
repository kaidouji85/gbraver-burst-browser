// @flow

import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {Resources} from "../../../resource/index";
import type {BatterySliderModel} from "../model/battery-slider-model";
import {drawBatterySlider} from "../../../canvas/battery-slider/index";
import * as THREE from "three";
import {TouchLocation} from "../../../operation/slider/touch-location";
import type {TouchRaycastContainer} from "../../../overlap/check/touch/touch-raycaster";
import type {MouseRaycaster} from "../../../overlap/check/mouse/mouse-raycaster";

/** メッシュの大きさ */
export const MESH_SIZE = 512;
/** テクスチャの大きさ */
export const TEXTURE_SIZE = 1024;
/** バッテリースライダーのパディングボトム */
export const PADDING_BOTTOM = 180;

/** コンストラクタのパラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** ゲージ最大値 */
  maxValue: number,
  /** デバイスに応じた表示倍率 */
  scale: number,
};

/** バッテリースライダーのビュー */
export class BatterySliderView {
  /** 本ビューで使用するthree.jsオブジェクトをまとめたもの */
  _group: THREE.Group;
  /** バッテリースライダーを描画するキャンバス */
  _canvasMesh: CanvasMesh;
  /** バッテリースライダーメーターの当たり判定 */
  _touchLocation: TouchLocation;
  /** ゲームループで使うためにリソース管理オブジェクトをキャッシュする */
  _resources: Resources;
  // TODO 外だしする
  /** デバイスに応じた表示倍率 */
  _scale: number;

  constructor(param: Param) {
    this._resources = param.resources;
    this._scale = param.scale;
    this._group = new THREE.Group();
    this._canvasMesh = new CanvasMesh({
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
      canvasWidth: TEXTURE_SIZE,
      canvasHeight: TEXTURE_SIZE,
    });
    this._touchLocation = new TouchLocation({
      start: 0,
      end: param.maxValue,
      width: 375,
      height: 84
    });
    this._canvasMesh.getThreeJsObjectList()
      .forEach(v => this._group.add(v));
    this._group.add(this._touchLocation.getObject3D());
  }

  /** ビューにモデルを反映させる */
  gameLoop(model: BatterySliderModel): void {
    this._refreshScale();
    this._refreshGauge(model);
    //this._refreshPos();
  }

  /** バッテリースライダーを更新する */
  _refreshGauge(model: BatterySliderModel): void {
    this._canvasMesh.draw((context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, this._canvasMesh.canvas.width, this._canvasMesh.canvas.height);
      context.save();
      context.globalAlpha = model.opacity;

      // バッテリースライダーが中央に描画されるようにする
      const dx = this._canvasMesh.canvas.width / 2;
      const dy = this._canvasMesh.canvas.height / 2;

      drawBatterySlider(context, this._resources, {
        battery: model.battery,
        maxEnableBattery: model.maxBattery,
        maxBattery: model.maxBattery,
        dx: dx,
        dy: dy
      });

      context.restore();
    });
  }

  /** オブジェクトのスケールを調整する */
  _refreshScale(): void {
    this._group.scale.set(this._scale, this._scale, this._scale);
  }

  /** 表示位置を更新する */
  _refreshPos(): void {
    const dx = 0;
    const dy = - window.innerHeight / 2 + PADDING_BOTTOM * this._scale;
    this._group.position.x = dx;
    this._group.position.y = dy;
  }

  /** マウスが重なっているスライダーの目盛りを返す */
  getMouseOverlap(mouse: MouseRaycaster): number[] {
    return this._touchLocation.getMouseOverlap(mouse);
  }

  /** 指が重なっているスライダーの目盛りを返す */
  getTouchOverlap(touch: TouchRaycastContainer): number[] {
    return this._touchLocation.getTouchOverlap(touch);
  }

  /** シーンに追加するthree.jsのオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this._group;
  }
}