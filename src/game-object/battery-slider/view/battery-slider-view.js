// @flow

import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {Resources} from "../../../resource/index";
import type {BatterySliderModel} from "../model/battery-slider-model";
import {drawBatterySlider} from "../../../canvas/battery-slider/index";
import * as THREE from "three";
import {TouchLocation} from "./touch-location";
import type {TouchRaycastContainer} from "../../../screen-touch/touch/touch-raycaster";
import type {MouseRaycaster} from "../../../screen-touch/mouse/mouse-raycaster";

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
  /** バッテリースライダーを描画するキャンバス */
  _canvasMesh: CanvasMesh;
  /** バッテリースライダーメーターの当たり判定 */
  _touchLocation: TouchLocation;
  /** ゲームループで使うためにリソース管理オブジェクトをキャッシュする */
  _resources: Resources;
  /** デバイスに応じた表示倍率 */
  _scale: number;
  /** 本ビューで使用するthree.jsオブジェクトをまとめたもの */
  _group: THREE.Group;

  constructor(param: Param) {
    this._resources = param.resources;
    this._scale = param.scale;
    this._canvasMesh = new CanvasMesh({
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
      canvasWidth: TEXTURE_SIZE,
      canvasHeight: TEXTURE_SIZE,
    });
    this._touchLocation = new TouchLocation(param.maxValue, param.scale);

    this._group = new THREE.Group();
    this._canvasMesh.getThreeJsObjectList()
      .forEach(v => this._group.add(v));
    this._touchLocation.getThreeJsObjectList()
      .forEach(v => this._group.add(v));
  }

  /** ビューにモデルを反映させる */
  gameLoop(model: BatterySliderModel): void {
    this._canvasMesh.mesh.scale.set(this._scale, this._scale, this._scale);
    this._refreshGauge(model);
    this._refreshPos();
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

  /** 表示位置を更新する */
  _refreshPos(): void {
    /*
    const dx = 0;
    const dy = - window.innerHeight / 2 + PADDING_BOTTOM * this._scale;
    this._canvasMesh.mesh.position.x = dx;
    this._canvasMesh.mesh.position.y = dy;
    this._touchLocation.setPos(dx, dy);
    */

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
  getThreeJsObjectList(): THREE.Mesh[] {
    return [this._group];
  }
}