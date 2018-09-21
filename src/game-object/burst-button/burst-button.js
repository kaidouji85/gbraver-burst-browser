// @flow

import * as THREE from 'three';
import type {BurstButtonModel} from "./model/burst-button-model";
import {BurstButtonView} from "./view/burst-button-view";
import type {Resources} from "../../resource";
import type {GameLoop} from "../../action/game-loop/game-loop";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";

type Param = {
  resources: Resources,
  listener: Observable<GameObjectAction>
};

/** バーストボタン */
export class BurstButton {
  _model: BurstButtonModel;
  _view: BurstButtonView;

  constructor(param: Param) {
    this._model = {};
    this._view = new BurstButtonView(param.resources);
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

  /** three.jsオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }
}