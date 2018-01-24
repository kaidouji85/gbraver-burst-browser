// @flow

import {Group, Tween} from '@tweenjs/tween.js'
import * as THREE from "three";
import type {BatteryGaugeModel} from "./model/battery-gauge-model";
import type {BatteryGaugeView} from "./view/battery-gauge-view";
import {change} from "./model/change";

/** バッテリーゲージのゲームオブジェクト */
export class BatteryGauge {
  _model: BatteryGaugeModel;
  _view: BatteryGaugeView;
  _tweenGroup: Group;

  constructor(params: {view: BatteryGaugeView, battery: number, maxBattery: number}) {
    this._view = params.view;
    this._model = {
      battery: params.battery,
      maxBattery: params.maxBattery
    };
    this._tweenGroup = new Group();
  }

  /** ゲームループ毎の処理 */
  gameLoop(time: DOMHighResTimeStamp) {
    this._tweenGroup.update(time);
    this._view.gameLoop(this._model);
  }

  /** シーンに追加するthree.jsオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._view.getThreeJsObjectList();
  }

  /** 指定したバッテリー値に即座に変更する */
  change(toBattery: number): Tween {
    return change(this._model, this._tweenGroup, toBattery);
  }

  /** 本オブジェクトに関連するTweenを全削除する */
  removeTween() {
    this._tweenGroup.removeAll();
  }
}

