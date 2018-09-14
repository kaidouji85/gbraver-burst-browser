// @flow

import type {BatteryNumberModel} from "./model/battery-number-model";
import type {BatteryNumberView} from "./view/battery-number-view";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import type {GameLoop} from "../../action/game-loop/game-loop";
import * as THREE from 'three';
import type {MultiTween} from "../../tween/multi-tween/multi-tween";
import {createInitialValue} from "./model/initial-value";
import {popUp} from "./animation/pop-up";
import {Group} from '@tweenjs/tween.js';

type Param = {
  listener: Observable<GameObjectAction>,
  view: BatteryNumberView
};

/** バッテリー数字 */
export class BatteryNumber {
  _model: BatteryNumberModel;
  _view: BatteryNumberView;
  _tween: Group;

  constructor(param: Param) {
    this._model = createInitialValue();
    this._view = param.view;
    this._tween = new Group();
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

  /** バッテリーを表示する */
  popUp(battery: number): MultiTween {
    return popUp(this._model, this._tween, battery);
  }

  /** シーンに追加するオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** ゲームループの処理 */
  _gameLoop(action: GameLoop) {
    this._tween.update(action.time);
    //this._view.engage(this._model);
  }
}