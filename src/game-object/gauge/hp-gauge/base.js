// @flow

import {HpGaugeStateContainer} from "./state";
import * as THREE from "three";

/** HPゲージゲームオブジェクト */
export class HpGauge {
  _model: HpGaugeModel;
  _state: HpGaugeState;
  _stateContainer: HpGaugeStateContainer;
  _view: HpGaugeView;

  constructor(params: {view: HpGaugeView, hp: number, maxHp: number}) {
    this._model = {
      hp: params.hp,
      maxHp: params.maxHp
    };
    this._stateContainer = new HpGaugeStateContainer();
    this._state = this._stateContainer.changeGradually(this._model, params.hp);
    this._view = params.view;
  };

  /** ゲームループ毎の処理 */
  gameLoop() {
    this._model = this._state.gameLoop(this._model);
    this._view.gameLoop(this._model);
  }

  /** シーンに追加するthree.jsオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._view.getThreeJsObjectList();
  }
}

/** HPゲージモデル */
export type HpGaugeModel = {
  /** 現在のHP */
  hp: number,
  /** 最大HP */
  maxHp: number
}

/** HPゲージの状態オブジェクト */
export interface HpGaugeState {
  /** モデルを更新する */
  gameLoop(model: HpGaugeModel): HpGaugeModel;
}

/** HPゲージのView */
export interface HpGaugeView {
  /** モデルの内容をViewに反映する */
  gameLoop(model: HpGaugeModel): void;
  /** シーンに追加するthree.jsオブジェクトを返す */
  getThreeJsObjectList(): THREE.Mesh[];
}