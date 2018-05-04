// @flow

import {BurstGaugeView} from "./view/burst-gauge-view";
import type {BurstGaugeModel} from "./model/burst-gauge-model";
import * as THREE from "three";

/** コンストラクタのパラメータ */
export type Param = {
  view: BurstGaugeView,
  isActive: boolean
};

/** バーストゲージ */
export class BurstGauge {
  _view: BurstGaugeView;
  _model: BurstGaugeModel;

  constructor(param: Param) {
    this._model = {
      isActive: param.isActive
    };
    this._view = param.view;
  }

  /** ゲームループの処理 */
  gameLoop(): void {
    this._view.gameLoop(this._model);
  }

  /**
   * ゲージの状態を変更する
   *
   * @param isActive ゲージがアクティブか否か、trueでアクティブ
   */
  setActive(isActive: boolean) {
    this._model.isActive = isActive;
  }

  /** シーンで使うthree.jsオブジェクトを全て取得する */
  getThreeJsObjectList(): THREE.Mesh[] {
    return this._view.getThreeJsObjectList();
  }
}