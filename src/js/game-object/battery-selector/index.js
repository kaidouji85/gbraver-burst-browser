// @flow

import {Howl} from 'howler';
import TWEEN from '@tweenjs/tween.js';
import type {Resources} from "../../resource";
import * as THREE from "three";
import type {ButtonLabel} from "./model/button-label";
import type {Update} from "../../game-loop/update";
import {Animate} from "../../animation/animate";
import {BatterySelectorView} from "./view";
import type {BatterySelectorModel} from "./model";
import {MAX_BATTERY} from "./model";
import {initialValue} from "./model/initial-value";
import {changeNeedle} from "./animation/change-needle";
import {getNeedleValue} from "./model/needle-value";
import {open} from './animation/open';
import {close} from './animation/close';
import {canBatteryMinus} from "./model/can-battery-minus";
import {canBatteryPlus} from "./model/can-battery-plus";
import type {PreRender} from "../../game-loop/pre-render";
import {SOUND_IDS} from "../../resource/sound";
import {decide} from './animation/decide';
import {batteryMinusPop} from "./animation/battery-minus-pop";
import {batteryPlusPop} from "./animation/battery-plus-pop";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream, UnSubscriber} from "../../stream/core";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  listener: Stream<GameObjectAction>,
  maxBattery: number,
  onBatteryChange: (battery: number) => void,
  onOkButtonPush: () => void,
};

/** バッテリーセレクタ */
export class BatterySelector {
  _model: BatterySelectorModel;
  _view: BatterySelectorView;
  _pushButtonSound: typeof Howl;
  _batteryChangeSound: typeof Howl;
  _batteryChangeTween: typeof TWEEN.Group;
  _batteryMinusTween: typeof TWEEN.Group;
  _batteryPlusTween: typeof TWEEN.Group;
  _unSubscriber: UnSubscriber;

  constructor(param: Param) {
    this._model = initialValue();
    this._batteryChangeTween = new TWEEN.Group();
    this._batteryMinusTween = new TWEEN.Group();
    this._batteryPlusTween = new TWEEN.Group();

    const pushButtonResource = param.resources.sounds.find(v => v.id === SOUND_IDS.PUSH_BUTTON);
    this._pushButtonSound = pushButtonResource
      ? pushButtonResource.sound
      : new Howl();

    const batteryChangeResource = param.resources.sounds.find(v => v.id === SOUND_IDS.CHANGE_VALUE);
    this._batteryChangeSound = batteryChangeResource
      ? batteryChangeResource.sound
      : new Howl();

    this._unSubscriber = param.listener.subscribe(action => {
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
        if (this._model.disabled || !canBatteryPlus(this._model)) {
          return;
        }

        this._batteryPlusPop();
        this._batteryChange(this._model.battery + 1);
        param.onBatteryChange(this._model.battery);
      },
      onMinusPush: () => {
        if (this._model.disabled || !canBatteryMinus(this._model)) {
          return;
        }

        this._batteryMinusPop();
        this._batteryChange(this._model.battery - 1);
        param.onBatteryChange(this._model.battery);
      }
    });
  }

  /** デストラクタ */
  destructor(): void {
    this._view.destructor();
    this._unSubscriber.unSubscribe();
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

  /**
   * バッテリー決定アニメーション
   *
   * @return アニメーション
   */
  decide(): Animate {
    this._pushButtonSound.play();
    return decide(this._model);
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
  getObject3D(): typeof THREE.Object3D {
    return this._view.getObject3D();
  }

  /** 状態更新 */
  _update(action: Update): void {
    this._batteryMinusTween.update(action.time);
    this._batteryPlusTween.update(action.time);
    this._batteryChangeTween.update(action.time);
  }

  /** プリレンダー */
  _preRender(action: PreRender): void {
    this._view.engage(this._model, action);
  }

  /**
   * バッテリーマイナスボタン ポップ
   */
  _batteryMinusPop(): void {
    this._batteryMinusTween.update();
    this._batteryMinusTween.removeAll();

    this._batteryChangeSound.play();
    batteryMinusPop(this._model, this._batteryMinusTween).play();
  }

  /**
   * バッテリープラスボタン ポップ
   */
  _batteryPlusPop(): void {
    this._batteryPlusTween.update();
    this._batteryPlusTween.removeAll();

    this._batteryChangeSound.play();
    batteryPlusPop(this._model, this._batteryPlusTween).play();
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