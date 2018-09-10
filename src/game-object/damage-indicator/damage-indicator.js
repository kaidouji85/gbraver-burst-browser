// @flow

import type {DamageIndicatorView} from "./view/damage-indicator-view";
import {createInitialValue} from "./model/initial-value";
import type {DamageIndicatorModel} from "./model/damage-indicator-model";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import * as THREE from 'three';
import type {GameLoop} from "../../action/game-loop/game-loop";
import type {MultiTween} from "../../tween/multi-tween/multi-tween";
import {popUp} from "./animation/pop-up";
import {Group} from '@tweenjs/tween.js';

type Param = {
  listener: Observable<GameObjectAction>,
  view: DamageIndicatorView
};

/** ダメージインジケータ */
export class DamageIndicator {
  _model: DamageIndicatorModel;
  _view: DamageIndicatorView;
  _tween: Group;

  constructor(param: Param) {
    this._view = param.view;
    this._model = createInitialValue();
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

  /** ダメージ数字を表示する */
  popUp(damage: number): MultiTween {
    return popUp(this._model, this._tween, damage);
  }

  /** シーンに追加するオブジェクトを取得する */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** ゲームループ */
  _gameLoop(action: GameLoop) {
    this._view.engage(this._model);
  }
}