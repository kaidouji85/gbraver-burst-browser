// @flow

import {Observable} from 'rxjs';
import type {Resources} from "../../resource";
import * as THREE from "three";
import {Group} from "@tweenjs/tween.js";
import type {ButtonLabel} from "./model/button-label";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Update} from "../../action/game-loop/update";
import {Animate} from "../../animation/animate";
import {BatterySelectorView} from "./view";
import type {BatterySelectorModel} from "./model";
import {MAX_BATTERY} from "./model";
import {initialValue} from "./model/initial-value";
import {changeNeedle} from "./animation/change-needle";
import {getNeedleValue} from "./model/needle-value";
import {open} from './animation/open';
import {close} from './animation/close';
import {isBatteryMinusDisabled} from "./model/is-battery-minus-disabled";
import {isBatteryPlusDisabled} from "./model/is-battery-plus-disabled";
import type {PreRender} from "../../action/game-loop/pre-render";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  listener: Observable<GameObjectAction>,
  maxBattery: number,
  onBatteryChange: (battery: number) => void,
  onOkButtonPush: () => void,
};

/** バッテリーセレクタ */
export class BatterySelector {
  _model: BatterySelectorModel;
  _view: BatterySelectorView;
  _batteryChangeTween: Group;

  constructor(param: Param) {
    this._model = initialValue();
    this._batteryChangeTween = new Group();

    param.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      } else if (action.type === 'PreRender') {
        this._preRender(action);
      }
    });

    this._view = new BatterySelectorView({
      resources: param.resources,
      listener: param.listener,
      onOkPush: () => {
        if (this._model.disabled) {
          return;
        }

        param.onOkButtonPush();
      },
      onPlusPush: () => {
        if (this._model.disabled || isBatteryPlusDisabled(this._model)) {
          return;
        }

        this._batteryChange(this._model.battery + 1);
        param.onBatteryChange(this._model.battery);
      },
      onMinusPush: () => {
        if (this._model.disabled || isBatteryMinusDisabled(this._model)) {
          return;
        }

        this._batteryChange(this._model.battery - 1);
        param.onBatteryChange(this._model.battery);
      }
    });
  }

  /**
   * バッテリーセレクターを開く
   *
   * @param initialValue 初期値
   * @param maxEnable 選択可能な最大値
   * @param label ボタンのラベル
   * @return アニメーション
   */
  open(initialValue: number, maxEnable: number, label: ButtonLabel): Animate {
    this._model.battery = initialValue;
    this._model.needle = getNeedleValue(initialValue);
    this._model.enableMaxBattery = Math.min(maxEnable, MAX_BATTERY);
    this._model.label = label;
    return open(this._model);
  }

  /** バッテリーセレクタを閉じる */
  close(): Animate {
    return close(this._model);
  }

  /** 現在のバッテリー値を取得する */
  getBattery(): number {
    return this._model.battery;
  }

  /** シーンに追加するthree.jsオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** 状態更新 */
  _update(action: Update): void {
    this._batteryChangeTween.update(action.time);
    this._view.engage(this._model);
  }

  /** プリレンダー */
  _preRender(action: PreRender): void {
    this._view.preRender(action);
  }

  /**
   * バッテリー値を変更するヘルパー関数
   *
   * @param battery 変更するバッテリー値
   */
  _batteryChange(battery: number): void {
    this._batteryChangeTween.update();
    this._batteryChangeTween.removeAll();

    this._model.battery = battery;
    const needle = getNeedleValue(battery);
    changeNeedle(this._model, this._batteryChangeTween, needle).play();
  }
}