// @flow

import * as THREE from "three";
import {ChangeGradually} from "./state/change-gradually";

/** HPゲージゲームオブジェクト */
export class HpGauge {
  _model: HpGaugeModel;
  _state: HpGaugeState;
  _stateContainer: {
    changeGradually: ChangeGradually
  };
  _view: HpGaugeView;

  constructor(params: {view: HpGaugeView, hp: number, maxHp: number}) {
    this._model = {
      hp: params.hp,
      maxHp: params.maxHp
    };
    this._stateContainer = {
      changeGradually: new ChangeGradually()
    };
    this.changeGradually(params.hp);
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

  /** 指定したHPに徐々に近づいていく */
  changeGradually(toHp: number) {
    this._stopAllTween();
    this._stateContainer.changeGradually.start(this._model, toHp);
    this._state = this._stateContainer.changeGradually;
  }

  /** 全てのTweenを停止する */
  _stopAllTween() {
    this._stateContainer.changeGradually.stop();
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