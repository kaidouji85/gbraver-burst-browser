// @flow

import type {BatteryNumberModel} from "./model/battery-number-model";
import type {BatteryNumberView} from "./view/battery-number-view";
import type {Resources} from "../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import type {GameLoop} from "../../action/game-loop/game-loop";
import * as THREE from 'three';

type Param = {
  resources: Resources,
  listener: Observable<GameObjectAction>,
  view: BatteryNumberView
};

/** バッテリー数字 */
export class BatteryNumber {
  _model: BatteryNumberModel;
  _view: BatteryNumberView;

  constructor(param: Param) {
    this._model = {};
    this._view = param.view;
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

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** ゲームループの処理 */
  _gameLoop(action: GameLoop) {
    this._view.engage(this._model);
  }
}