// @flow

import TWEEN from '@tweenjs/tween.js';
import {Howl} from 'howler';
import * as THREE from "three";
import {Animate} from "../../animation/animate";
import type {PreRender} from "../../game-loop/pre-render";
import type {Update} from "../../game-loop/update";
import type {Resources} from "../../resource";
import {SOUND_IDS} from "../../resource/sound";
import type {Stream, Unsubscriber} from "../../stream/stream";
import type {GameObjectAction} from "../action/game-object-action";
import {batteryMinusPop} from "./animation/battery-minus-pop";
import {batteryPlusPop} from "./animation/battery-plus-pop";
import {changeNeedle} from "./animation/change-needle";
import {close} from './animation/close';
import {decide} from './animation/decide';
import {open} from './animation/open';
import type {BatterySelectorModel} from "./model";
import {MAX_BATTERY} from "./model";
import type {ButtonLabel} from "./model/button-label";
import {canBatteryMinus} from "./model/can-battery-minus";
import {canBatteryPlus} from "./model/can-battery-plus";
import {initialValue} from "./model/initial-value";
import {getNeedleValue} from "./model/needle-value";
import {BatterySelectorView} from "./view";

/** コンストラクタのパラメータ */
type Param = {
  /** リソース管理オブジェクト */
  resources: Resources,
  /** ゲームオブジェクトアクション */
  gameObjectAction: Stream<GameObjectAction>,
  /** 最大バッテリー */
  maxBattery: number,
  /**
   * バッテリー変更時に呼ばれるのコールバック関数
   *
   * @param battery 変更後のバッテリー値
   */
  onBatteryChange: (battery: number) => void,
  /** 決定ボタンが押された時に呼ばれるコールバック関数 */
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
  _unsubscriber: Unsubscriber;

  /**
   * コンストラクタ
   *
   * @param param パラメータ
   */
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

    this._unsubscriber = param.gameObjectAction.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      } else if (action.type === 'PreRender') {
        this._preRender(action);
      }
    });

    this._view = new BatterySelectorView({
      resources: param.resources,
      gameObjectAction: param.gameObjectAction,
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
    this._unsubscriber.unsubscribe();
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