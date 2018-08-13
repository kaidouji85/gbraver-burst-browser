// @flow

import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {Resources} from "../../../resource/index";
import type {BatterySelectorModel} from "../model/battery-selector";
import {drawBatterySlider} from "../../../canvas/battery-slider/index";
import * as THREE from "three";
import {SliderOperation} from "../../../operation/slider";
import * as R from 'ramda';
import type {OverlapListener} from "../../../observer/overlap/overlap-listener";
import {ButtonOperation} from "../../../operation/button";
import {refreshGauge} from "./refresh-gauge";

/** メッシュの大きさ */
export const MESH_SIZE = 512;
/** テクスチャの大きさ */
export const TEXTURE_SIZE = 1024;
/** スライダー当たり判定横幅 */
export const SLIDER_WIDTH = 307.5;
/** スライダー当たり判定高 */
export const SLIDER_HEIGHT = 84;
/** OKボタンの当たり判定横幅 */
export const BUTTON_WIDTH = 182.5;
/** OKボタンの当たり判定横高 */
export const BUTTON_HEIGHT = 58.5;

/** コンストラクタのパラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** ゲージ最大値 */
  maxValue: number,
  /** 当たり判定関連のリスナー */
  overlapListener: OverlapListener,
  /** デバイスに応じた表示倍率 */
  scale: number,
  /** バッテリーが変更された場合のコールバック関数 */
  onBatteryChange: (battery: number) => void,
  /** OKボタンが押された時のコールバック関数 */
  onOkButtonPush: () => void,
};

/** バッテリースライダーのビュー */
export class BatterySliderView {
  /** 本ビューで使用するthree.jsオブジェクトをまとめたもの */
  _group: THREE.Group;
  /** バッテリースライダーを描画するキャンバス */
  _canvasMesh: CanvasMesh;
  /** バッテリースライダーの当たり判定を行う */
  _sliderOperation: SliderOperation;
  /** OKボタンの当たり判定を行う */
  _okButtonOperation: ButtonOperation;
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
      values: R.range(0, param.maxValue + 1),
      width: SLIDER_WIDTH,
      height: SLIDER_HEIGHT,
      overlapListener: param.overlapListener,
      onValueChange: v => param.onBatteryChange(v)
    });
    this._sliderOperation.getObject3D().position.y += 48;
    this._group.add(this._sliderOperation.getObject3D());

    this._okButtonOperation = new ButtonOperation({
      width: BUTTON_WIDTH,
      height: BUTTON_HEIGHT,
      listener: param.overlapListener,
      onButtonPush: () => {
        param.onOkButtonPush();
      }
    });
    this._okButtonOperation.getObject3D().position.y = -48;
    this._group.add(this._okButtonOperation.getObject3D());
  }

  /** ビューにモデルを反映させる */
  engage(model: BatterySelectorModel): void {
    this._refreshScale();
    this._refreshGauge(model);
  }


  /** オブジェクトのスケールを調整する */
  _refreshScale(): void {
    this._group.scale.set(this._scale, this._scale, this._scale);
  }

  /** バッテリースライダーを更新する */
  _refreshGauge(model: BatterySelectorModel): void {
    this._canvasMesh.draw((context: CanvasRenderingContext2D) => {
      refreshGauge(context, this._resources, model);
    });
  }

  getObject3D(): THREE.Object3D {
    return this._group;
  }
}