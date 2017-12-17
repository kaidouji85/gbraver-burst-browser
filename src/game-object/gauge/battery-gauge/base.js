// @flow

import * as THREE from "three";
import {BatteryGaugeStateContainer} from "./state";

/** バッテリーゲージのゲームオブジェクト */
export class BatteryGauge {
  _model: BatteryGaugeModel;
  _state: BatteryGaugeState;
  _stateContainer: BatteryGaugeStateContainer;
  _view: BatteryGaugeView;

  constructor(params: {view: BatteryGaugeView, battery: number, maxBattery: number}) {
    this._view = params.view;
    this._model = {
      battery: params.battery,
      maxBattery: params.maxBattery
    };
    this._stateContainer = new BatteryGaugeStateContainer();
    this._state = this._stateContainer.changeImmediately;
  }

  /** シーンに追加するthree.jsオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._view.getThreeJsObjectList();
  }

  /** ゲームループ毎の処理 */
  gameLoop() {
    this._model = this._state.gameLoop(this._model);
    this._view.gameLoop(this._model);
  }
}

/** バッテリーゲージモデル */
export type BatteryGaugeModel = {
  battery: number,
  maxBattery: number,
};

/** バッテリーゲージ状態オブジェクト */
export interface BatteryGaugeState  {
  /** モデルを更新する */
  gameLoop(model: BatteryGaugeModel): BatteryGaugeModel;
}

/** バッテリーゲージのビュー */
export interface BatteryGaugeView {
  /** モデルの内容をViewに反映する */
  gameLoop(model: BatteryGaugeModel): void;
  /** シーンに追加するthree.jsオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[];
}