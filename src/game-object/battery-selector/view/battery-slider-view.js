// @flow

import {CanvasMesh} from "../../../mesh/canvas-mesh";
import type {Resources} from "../../../resource/index";
import type {BatterySelectorModel} from "../model/battery-selector";
import * as THREE from "three";
import {SliderOperation} from "../../../operation/slider";
import * as R from 'ramda';
import {ButtonOperation} from "../../../operation/button";
import {refreshGauge} from "./refresh-gauge";
import type {OverlapAction} from "../../../action/overlap";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../action/game-object-action";

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
/** スライダー全体の拡大率 */
const SCALE = 0.4;

/** コンストラクタのパラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** ゲージ最大値 */
  maxValue: number,
  /** アクションリスナー */
  listener: Observable<GameObjectAction>,
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

  constructor(param: Param) {
    this._resources = param.resources;
    this._group = new THREE.Group();
    this._canvasMesh = new CanvasMesh({
      meshWidth: MESH_SIZE,
      meshHeight: MESH_SIZE,
      canvasWidth: TEXTURE_SIZE,
      canvasHeight: TEXTURE_SIZE,
    });
    this._canvasMesh.getThreeJsObjectList()
      .forEach(v => this._group.add(v));

    const minValue = 0;
    this._sliderOperation = new SliderOperation({
      values: R.range(minValue, param.maxValue + 1),
      width: SLIDER_WIDTH,
      height: SLIDER_HEIGHT,
      listener: param.listener,
      onValueChange: v => param.onBatteryChange(v)
    });
    this._sliderOperation.getObject3D().position.y += 96;
    this._group.add(this._sliderOperation.getObject3D());

    this._okButtonOperation = new ButtonOperation({
      width: BUTTON_WIDTH,
      height: BUTTON_HEIGHT,
      listener: param.listener,
      onButtonPush: () => {
        param.onOkButtonPush();
      }
    });
    this._okButtonOperation.getObject3D().position.y = -96;
    this._group.add(this._okButtonOperation.getObject3D());
  }

  /** シーンに追加するthree.jsのオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._group;
  }

  /** ビューにモデルを反映させる */
  engage(model: BatterySelectorModel): void {
    this._setScale();
    this._refreshGauge(model);
    this._setPos();
  }

  /** 最終入力値を強制的に設定する */
  setLastBattery(battery: number): void {
    this._sliderOperation.lastValue = battery;
  }

  /** 最終入力値を取得する */
  getLastBattery(): ?number {
    return this._sliderOperation.lastValue;
  }

  /** 全体のスケールを調整する */
  _setScale(): void {
    this._group.scale.set(SCALE, SCALE, SCALE);
  }

  /** バッテリースライダーを更新する */
  _refreshGauge(model: BatterySelectorModel): void {
    this._canvasMesh.draw((context: CanvasRenderingContext2D) => {
      refreshGauge(context, this._resources, model);
    });
  }

  /** バッテリースライダーの座標を更新する */
  _setPos(): void {
    this._group.position.y =  - window.innerHeight / 2 + 96;
  }
}