// @flow

import {Observable, Subject} from 'rxjs';
import type {BatterySelectorModel} from "./model/battery-selector";
import {BatterySliderView} from "./view/battery-slider-view";
import type {Resources} from "../../resource/index";
import * as THREE from "three";
import {changeBattery} from './animation/change-battery';
import {Group, Tween} from "@tweenjs/tween.js";
import type {TouchRaycastContainer} from "../../overlap/check/touch/touch-raycaster";
import type {MouseRaycaster} from "../../overlap/check/mouse/mouse-raycaster";
import {getControllerScale} from "../../device-scale/controller-scale";
import {map, filter, distinctUntilChanged} from 'rxjs/operators';
import type {MultiTween} from "../../tween/multi-tween/multi-tween";
import {open} from './animation/open';

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  maxBattery: number,
  onBatteryChange: (battery: number) => void
};

/** バッテリーセレクタ */
export class BatterySelector {
  /** バッテリースライダーのモデル */
  _model: BatterySelectorModel;
  /** バッテリースライダーのビュー */
  _view: BatterySliderView;
  /** 本クラスのTweenグループ */
  _tween: Group;

  constructor(param: Param) {
    const initialBattery = 3;
    this._model = {
      slider: {
        battery: 0,
        max: param.maxBattery,
        enableMax: param.maxBattery
      },
      disabled: false,
      opacity: 0
    };
    this._view = new BatterySliderView({
      resources: param.resources,
      maxValue: param.maxBattery,
      scale: getControllerScale(),
      onBatteryChange: battery => {
        if (this._model.disabled) {
          return;
        }

        this._tween.update();
        this._tween.removeAll();
        changeBattery(this._model, this._tween, battery).start();
        param.onBatteryChange(battery);
      }
    });
    this._tween = new Group();
  }

  /** ゲームループの処理 */
  gameLoop(time: DOMHighResTimeStamp): void {
    this._tween.update();
    this._view.engage(this._model);
  }

  /**
   * バッテリーセレクターを開く
   *
   * @param maxEnable 選択可能な最大値
   * @return アニメーション
   */
  open(maxEnable: number): MultiTween {
    return open(this._model, this._tween, maxEnable);
  }

  onMouseDown(mouse: MouseRaycaster): void {
    this._view.onMouseDown(mouse);
  }

  onMouseMove(mouse: MouseRaycaster, isLeftButtonPushed: boolean): void {
    this._view.onMouseMove(mouse, isLeftButtonPushed);
  }

  onTouchStart(touch: TouchRaycastContainer): void {
    this._view.onTouchStart(touch);
  }

  onTouchMove(touch: TouchRaycastContainer): void {
    this._view.onTouchMove(touch);
  }

  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }
}