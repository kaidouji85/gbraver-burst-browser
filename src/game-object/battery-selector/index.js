// @flow

import {Observable, Subject} from 'rxjs';
import type {BatterySelectorModel} from "./model/battery-selector";
import type {Resources} from "../../resource/index";
import * as THREE from "three";
import {changeBattery} from './animation/change-battery';
import {Group} from "@tweenjs/tween.js";
import {pushOkButton} from "./animation/push-ok-button";
import type {OkButtonLabel} from "./model/ok-button";
import type {GameObjectAction} from "../../action/game-object-action";
import {close} from './animation/close';
import type {Update} from "../../action/game-loop/update";
import {createInitialValue} from "./model/initial-value";
import {Animate} from "../../animation/animate";
import {BatterySelectorView} from "./view";
import {empty} from '../../animation/delay';

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
    this._model = createInitialValue(param.maxBattery);
    this._batteryChangeTween = new Group();

    param.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      }
    });

    this._view = new BatterySelectorView(param.resources, param.listener);
  }

  /**
   * バッテリーセレクターを開く
   *
   * @param initialValue 初期値
   * @param maxEnable 選択可能な最大値
   * @param okButtonLabel OKボタンのラベル
   * @return アニメーション
   */
  open(initialValue: number, maxEnable: number, okButtonLabel: OkButtonLabel): Animate {
    /*
    return process(() => {
      this._view.setLastBattery(initialValue);
    }).chain(
      open({
        model: this._model,
        initialValue: initialValue,
        maxEnable: maxEnable,
        okButtonLabel: okButtonLabel
      })
    );
    */
    return empty();
  }

  /** バッテリーセレクタを閉じる */
  close(): Animate {
    return close(this._model);
  }

  /** 現在のバッテリー値を取得する */
  getBattery(): number {
    return 0;
    // const lastBattery = this._view.getLastBattery();
    // if (lastBattery === null || lastBattery === undefined) {
    //   return 0;
    // }
    //
    // return lastBattery;
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

  /** バッテリーが変更された際のイベント */
  _changeBattery(battery: number): void {
    if (this._model.disabled || this._model.slider.enableMax < battery) {
      return;
    }

    this._batteryChangeTween.update();
    this._batteryChangeTween.removeAll();
    changeBattery(this._model, this._batteryChangeTween, battery).play();
    this._onBatteryChange(battery);
  }

  /** OKボタンが押された際のイベント */
  async _pushOkButton(): Promise<void> {
    if (this._model.disabled) {
      return;
    }

    await pushOkButton(this._model).play();
    this._onOkButtonPush();
  }
}