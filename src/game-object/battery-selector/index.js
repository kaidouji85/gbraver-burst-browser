// @flow

import {Observable, Subject} from 'rxjs';
import type {BatterySelectorModel} from "./model/battery-selector";
import {BatterySelectorView} from "./view/battery-selector-view";
import type {Resources} from "../../resource/index";
import * as THREE from "three";
import {changeBattery} from './animation/change-battery';
import {Group, Tween} from "@tweenjs/tween.js";
import {open} from './animation/open';
import {pushOkButton} from "./animation/push-ok-button";
import type {GameLoop} from "../../action/game-loop/game-loop";
import type {OkButtonLabel} from "./model/ok-button";
import type {GameObjectAction} from "../../action/game-object-action";
import type {MultiTween} from "../../tween/multi-tween/multi-tween";
import {play} from "../../tween/multi-tween/play";

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
  _tween: Group;
  _onBatteryChange: (battery: number) => void;

  constructor(param: Param) {
    this._onBatteryChange = param.onBatteryChange;
    this._model = this._initialModel(param);
    this._tween = new Group();

    param.listener.subscribe(action => {
      switch (action.type) {
        case 'GameLoop':
          this._gameLoop(action);
          return;
        default:
          return;
      }
    });

    this._view = new BatterySelectorView({
      resources: param.resources,
      listener: param.listener,
      maxValue: param.maxBattery,
      onBatteryChange: battery => this._changeBattery(battery),
      onOkButtonPush: () => {
        if (!this._model.disabled) {
          play(this.pushOkButton());
          param.onOkButtonPush();
        }
      }
    });
  }

  /**
   * バッテリーセレクターを開く
   *
   * @param initialValue 初期値
   * @param maxEnable 選択可能な最大値
   * @param okButtonLabel OKボタンのラベル
   * @return アニメーション
   */
  open(initialValue: number, maxEnable: number, okButtonLabel: OkButtonLabel): MultiTween {
    return open({
      model: this._model,
      group: this._tween,
      initialValue: initialValue,
      maxEnable: maxEnable,
      okButtonLabel: okButtonLabel,
      onStart: () => {
        this._view.setLastBattery(initialValue)
      },
    });
  }

  /** OKボタンを押す */
  pushOkButton(): MultiTween {
    return pushOkButton(this._model, this._tween);
  }

  /** 現在のバッテリー値を取得する */
  getBattery(): number {
    const lastBattery = this._view.getLastBattery();
    if (lastBattery === null || lastBattery === undefined) {
      return 0;
    }

    return lastBattery;
  }

  /** シーンに追加するthree.jsオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** モデルの初期値 */
  _initialModel(param: Param): BatterySelectorModel {
    return {
      slider: {
        battery: 0,
          max: param.maxBattery,
          enableMax: param.maxBattery
      },
      okButton: {
        depth: 0,
        label: 'Attack'
      },
      disabled: false,
        opacity: 0
    };
  }

  /** ゲームループの処理 */
  _gameLoop(action: GameLoop): void {
    this._tween.update(action.time);
    this._view.engage(this._model);
  }

  /** バッテリーが変更された際のイベント */
  _changeBattery(battery: number): void {
    if (this._model.disabled || this._model.slider.enableMax < battery) {
      return;
    }

    this._tween.update();
    this._tween.removeAll();
    changeBattery(this._model, this._tween, battery).start();
    this._onBatteryChange(battery);
  }
}