// @flow

import * as THREE from 'three';
import type {Resources} from "../../resource";
import type {TurnIndicatorModel} from "./model/turn-indicator-model";
import {TurnIndicatorView} from "./view/turn-indicator-view";

type Param = {
  resources: Resources
};

/** ターンインジケーター */
export class TurnIndicator {
  _model: TurnIndicatorModel;
  _view: TurnIndicatorView;

  constructor(param: Param) {
    this._model = {
      isPlayerTurn: true
    };
    this._view = new TurnIndicatorView(param.resources);
  }

  /** ゲームループの処理 */
  gameLoop(time: DOMHighResTimeStamp): void {
    this._view.engage(this._model);
  }

  /** ターンインジケーターで使うthree.jsオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /**
   * ターン変更
   *
   * @param isPlayerTurn プレイヤーターンか否かのフラグ、trueでプレイヤーターン
   */
  turnChange(isPlayerTurn: boolean): void {
    this._model.isPlayerTurn = isPlayerTurn;
  }
}