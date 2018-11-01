// @flow

import type {DamageIndicatorView} from "./view/damage-indicator-view";
import {createInitialValue} from "./model/initial-value";
import type {DamageIndicatorModel} from "./model/damage-indicator-model";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import * as THREE from 'three';
import type {MultiTween} from "../../depricated-tween/multi-tween/multi-tween";
import {popUp} from "./animation/pop-up";
import {Group} from '@tweenjs/tween.js';
import type {Update} from "../../action/game-loop/update";
import type {PreRender} from "../../action/game-loop/pre-render";

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
      if (action.type === 'Update') {
        this._update(action);
      } else if (action.type === 'PreRender') {
        this._preRender(action);
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

  /** 状態更新 */
  _update(action: Update) {
    this._tween.update(action.time);
    this._view.engage(this._model);
  }

  /** プリレンダー */
  _preRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}