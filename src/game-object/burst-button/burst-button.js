// @flow

import * as THREE from 'three';
import type {BurstButtonModel} from "./model/burst-button-model";
import {BurstButtonView} from "./view/burst-button-view";
import type {Resources} from "../../resource";
import type {GameLoop} from "../../action/game-loop/game-loop";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import {createInitialValue} from "./model/initial-value";
import {Group} from '@tweenjs/tween.js';
import type {MultiTween} from "../../tween/multi-tween/multi-tween";
import {visible} from './animation/visible';
import {invisible} from './animation/invisible';

type Param = {
  resources: Resources,
  listener: Observable<GameObjectAction>
};

/** バーストボタン */
export class BurstButton {
  _model: BurstButtonModel;
  _view: BurstButtonView;
  _tween: Group;

  constructor(param: Param) {
    this._model = createInitialValue();
    this._view = new BurstButtonView(param.resources);
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

  /** ボタンを表示する */
  visible(): MultiTween {
    return visible(this._model, this._tween);
  }

  /** ボタンを非表示にする */
  invisible(): MultiTween {
    return invisible(this._model, this._tween);
  }

  /** three.jsオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** ゲームループの処理 */
  _gameLoop(action: GameLoop): void {
    this._tween.update(action.time);
    this._view.engage(this._model);
  }
}