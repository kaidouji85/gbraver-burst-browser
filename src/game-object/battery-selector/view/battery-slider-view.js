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
const MESH_SIZE = 1024;
/** テクスチャの大きさ */
const TEXTURE_SIZE = 1024;
/** スライダー当たり判定横幅 */
const SLIDER_WIDTH = 615;
/** スライダー当たり判定高 */
const SLIDER_HEIGHT = 168;
/** OKボタンの当たり判定横幅 */
const BUTTON_WIDTH = 365;
/** OKボタンの当たり判定横高 */
const BUTTON_HEIGHT = 117;

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
    this._sliderOperation.getObject3D().position.y += 96;
    this._group.add(this._sliderOperation.getObject3D());

    this._okButtonOperation = new ButtonOperation({
      width: BUTTON_WIDTH,
      height: BUTTON_HEIGHT,
      listener: param.overlapListener,
      onButtonPush: () => {
        param.onOkButtonPush();
      }
    });
    this._okButtonOperation.getObject3D().position.y = -96;
    this._group.add(this._okButtonOperation.getObject3D());
  }

  /** ビューにモデルを反映させる */
  engage(model: BatterySelectorModel): void {
    this._setScale();
    this._refreshGauge(model);
  }

  /** 全体のスケールを調整する */
  _setScale(): void {
    this._group.scale.set(0.4, 0.4, 0.4);
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