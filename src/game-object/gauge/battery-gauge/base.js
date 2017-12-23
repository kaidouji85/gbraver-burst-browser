// @flow

import * as THREE from "three";
import {ChangeImmediately} from "./state/change-immediately";

/** バッテリーゲージのゲームオブジェクト */
export class BatteryGauge {
  _model: BatteryGaugeModel;
  _state: BatteryGaugeState;
  _stateContainer: {
    changeImmediately: ChangeImmediately,
  };
  _view: BatteryGaugeView;

  constructor(params: {view: BatteryGaugeView, battery: number, maxBattery: number}) {
    this._view = params.view;
    this._model = {
      battery: params.battery,
      maxBattery: params.maxBattery
    };
    this._stateContainer = {
      changeImmediately: new ChangeImmediately()
    };
    this.changeImmediately(this._model.battery);
  }

  /** ゲームループ毎の処理 */
  gameLoop() {
    this._model = this._state.gameLoop(this._model);
    this._view.gameLoop(this._model);
  }

  /** シーンに追加するthree.jsオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._view.getThreeJsObjectList();
  }

  /** 指定したバッテリー値に即座に変更する */
  changeImmediately(toBattery: number) {
    this._stateContainer.changeImmediately.start(toBattery);
    this._state = this._stateContainer.changeImmediately;
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