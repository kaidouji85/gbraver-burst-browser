// @flow

import * as THREE from 'three';
import type {Resources} from "../../resource";
import type {TurnIndicatorModel} from "./model/turn-indicator-model";
import {TurnIndicatorView} from "./view/turn-indicator-view";
import type {GameLoop} from "../../action/game-loop/game-loop";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";

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
      switch (action.type) {
        case 'GameLoop':
          this._gameLoop(action);
          return;
        default:
          return;
      }
    });
  }

  /** ゲームループの処理 */
  _gameLoop(action: GameLoop): void {
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