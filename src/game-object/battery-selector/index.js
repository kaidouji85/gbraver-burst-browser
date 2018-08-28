// @flow

import {Observable, Subject} from 'rxjs';
import type {BatterySelectorModel} from "./model/battery-selector";
import {BatterySliderView} from "./view/battery-slider-view";
import type {Resources} from "../../resource/index";
import * as THREE from "three";
import {changeBattery} from './animation/change-battery';
import {Group, Tween} from "@tweenjs/tween.js";
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {open} from './animation/open';
import {pushOkButton} from "./animation/push-ok-button";
import type {GameLoop} from "../../action/game-loop/game-loop";
import type {OverlapAction} from "../../action/overlap";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  gameLoopListener: Observable<GameLoop>,
  overlapListener: Observable<OverlapAction>,
  maxBattery: number,
  onBatteryChange: (battery: number) => void,
  onOkButtonPush: () => void,
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
      okButton: {
        depth: 0
      },
      disabled: false,
      opacity: 0
    };
    this._tween = new Group();

    param.gameLoopListener.subscribe(action => {
      switch (action.type) {
        case 'GameLoop':
          this._gameLoop(action);
          return;
        default:
          return;
      }
    });

    this._view = new BatterySliderView({
      resources: param.resources,
      overlapListener: param.overlapListener,
      maxValue: param.maxBattery,
      onBatteryChange: battery => {
        if (this._model.disabled || this._model.slider.enableMax < battery) {
          return;
        }

        this._tween.update();
        this._tween.removeAll();
        changeBattery(this._model, this._tween, battery).start();
        param.onBatteryChange(battery);
      },
      onOkButtonPush: () => {
        if (this._model.disabled) {
          return;
        }

        const animation = pushOkButton(this._model, this._tween);
        animation.start.start();
        animation.end.onComplete(() => param.onOkButtonPush());
      }
    });
  }

  /** ゲームループの処理 */
  _gameLoop(action: GameLoop): void {
    this._tween.update(action.time);
    this._view.engage(this._model);
  }

  /**
   * バッテリーセレクターを開く
   *
   * @param initialValue 初期値
   * @param maxEnable 選択可能な最大値
   * @return アニメーション
   */
  open(initialValue: number, maxEnable: number): Tween {
    return open(this._model, this._tween, initialValue, maxEnable);
  }

  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }
}