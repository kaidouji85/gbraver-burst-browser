// @flow

import {Observable, Subject} from 'rxjs';
import type {Resources} from "../../resource";
import * as THREE from "three";
import {Group} from "@tweenjs/tween.js";
import type {ButtonLabel} from "./model/button-label";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Update} from "../../action/game-loop/update";
import {Animate} from "../../animation/animate";
import {BatterySelectorView} from "./view";
import {empty} from '../../animation/delay';
import type {BatterySelectorModel} from "./model/battery-selector-model";
import {MAX_BATTERY, MIN_BATTERY} from "./model/battery-selector-model";
import {initialValue} from "./model/initial-value";
import {changeNeedle} from "./animation/change-needle";

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
  _onBatteryChange: (battery: number) => void;
  _onOkButtonPush: () => void;

  constructor(param: Param) {
    this._onBatteryChange = param.onBatteryChange;
    this._onOkButtonPush = param.onOkButtonPush;
    this._model = initialValue();
    this._batteryChangeTween = new Group();

    param.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      }
    });

    this._view = new BatterySelectorView({
      resources: param.resources,
      listener: param.listener,
      onPlusPush: () => {
        const battery = Math.min(this._model.battery + 1, this._model.enableMaxBattery);
        this._batteryChange(battery);
      },
      onMinusPush: () => {
        const battery = Math.max(this._model.battery - 1, MIN_BATTERY);
        this._batteryChange(battery);
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
    this._model.enableMaxBattery = Math.min(maxEnable, MAX_BATTERY);
    this._model.label = label;
    return empty();
  }

  /** バッテリーセレクタを閉じる */
  close(): Animate {
    return empty();
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

  /**
   * バッテリー値を変更する
   *
   * @param battery 変更するバッテリー値
   */
  _batteryChange(battery: number): void {
    this._batteryChangeTween.update();
    this._batteryChangeTween.removeAll();

    this._model.battery = battery;
    const needle = this._model.battery / MAX_BATTERY;
    changeNeedle(this._model, this._batteryChangeTween, needle).play();
  }
}