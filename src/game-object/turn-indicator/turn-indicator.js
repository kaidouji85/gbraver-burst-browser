// @flow

import * as THREE from 'three';
import type {Resources} from "../../resource";
import type {TurnIndicatorModel} from "./model/turn-indicator-model";
import {TurnIndicatorView} from "./view/turn-indicator-view";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Update} from "../../action/game-loop/update";

type Param = {
  resources: Resources,
  listener: Observable<GameObjectAction>
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

    param.listener.subscribe(action => {
      if (action.type === 'Update') {
        this._update(action);
      }
    });
  }

  /**
   * ターン変更
   *
   * @param isPlayerTurn プレイヤーターンか否かのフラグ、trueでプレイヤーターン
   */
  turnChange(isPlayerTurn: boolean): void {
    this._model.isPlayerTurn = isPlayerTurn;
  }

  /** ターンインジケーターで使うthree.jsオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** 状態更新 */
  _update(action: Update): void {
    this._view.engage(this._model);
  }
}