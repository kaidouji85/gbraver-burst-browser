// @flow

import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {Resources} from "../../../resource/index";
import type {BatterySliderModel} from "../model/battery-slider-model";
import {drawBatterySlider} from "../../../canvas/battery-slider/index";
import * as THREE from "three";
import {TouchLocation} from "../../../operation/slider/touch-location";
import type {TouchRaycastContainer} from "../../../overlap/check/touch/touch-raycaster";
import type {MouseRaycaster} from "../../../overlap/check/mouse/mouse-raycaster";
import {SliderOperation} from "../../../operation/slider";

/** メッシュの大きさ */
export const MESH_SIZE = 512;
/** テクスチャの大きさ */
export const TEXTURE_SIZE = 1024;
/** バッテリースライダーのパディングボトム */
export const PADDING_BOTTOM = 180;

export const SLIDER_WIDTH = 375;

export const SLIDER_HEIGHT = 84;

/** コンストラクタのパラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** ゲージ最大値 */
  maxValue: number,
  /** デバイスに応じた表示倍率 */
  scale: number,
  /** バッテリーが変更された場合のコールバック関数 */
  onBatteryChange: (battery: number) => void
};

/** バッテリースライダーのビュー */
export class BatterySliderView {
  /** 本ビューで使用するthree.jsオブジェクトをまとめたもの */
  _group: THREE.Group;
  /** バッテリースライダーを描画するキャンバス */
  _canvasMesh: CanvasMesh;
  /** バッテリースライダーの当たり判定を行う */
  _sliderOperation: SliderOperation;
  /** ゲームループで使うためにリソース管理オブジェクトをキャッシュする */
  _resources: Resources;
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
    this._canvasMesh.getThreeJsObjectList()
      .forEach(v => this._group.add(v));

    this._sliderOperation = new SliderOperation({
      start: 0,
      end: param.maxValue,
      width: SLIDER_WIDTH,
      height: SLIDER_HEIGHT,
      onValueChange: v => param.onBatteryChange(v)
    });
    this._group.add(this._sliderOperation.getObject3D());
  }

  /** ビューにモデルを反映させる */
  engage(model: BatterySliderModel): void {
    this._refreshScale();
    this._refreshGauge(model);
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

  onMouseDown(mouse: MouseRaycaster): void {
    this._sliderOperation.onMouseDown(mouse);
  }

  onMouseMove(mouse: MouseRaycaster, isLeftButtonPushed: boolean): void {
    this._sliderOperation.onMouseMove(mouse, isLeftButtonPushed);
  }

  onTouchStart(touch: TouchRaycastContainer): void {
    this._sliderOperation.onTouchStart(touch);
  }

  onTouchMove(touch: TouchRaycastContainer): void {
    this._sliderOperation.onTouchMove(touch);
  }

  getObject3D(): THREE.Object3D {
    return this._group;
  }


}