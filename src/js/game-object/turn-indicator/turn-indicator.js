// @flow

import TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';
import type {Resources} from "../../resource";
import type {TurnIndicatorModel} from "./model/turn-indicator-model";
import {TurnIndicatorView} from "./view/turn-indicator-view";
import {Observable, Subscription} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Update} from "../../action/game-loop/update";
import type {PreRender} from "../../action/game-loop/pre-render";
import {invisible} from "./animation/invisible";
import {show} from "./animation/show";
import {Animate} from "../../animation/animate";
import {createInitialValue} from "./model/initial-value";
import {waiting} from "./animation/waiting";
import {process} from '../../animation/process';

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  listener: Observable<GameObjectAction>
};

/** ターンインジケーター */
export class TurnIndicator {
  _tween: TWEEN.Group;
  _model: TurnIndicatorModel;
  _view: TurnIndicatorView;
  _subscription: Subscription[];

  constructor(param: Param) {
    this._tween = new TWEEN.Group();
    this._model = createInitialValue();
    this._view = new TurnIndicatorView(param.resources);

    this._subscription = [
      param.listener.subscribe(action => {
        if (action.type === 'Update') {
          this._update(action);
        } else if (action.type === 'PreRender') {
          this._preRender(action);
        }
      })
    ];
  }

  /** デストラクタ */
  destructor(): void {
    this._view.destructor();
    this._subscription.forEach(v => {
      v.unsubscribe();
    });
    this._tween.removeAll();
  }

  /**
   * ターン変更
   *
   * @param isPlayerTurn プレイヤーターンか否かのフラグ、trueでプレイヤーターン
   * @return アニメーション
   */
  turnChange(isPlayerTurn: boolean): Animate {
    return process(() => {
      this._model.animation = 0;
      waiting(this._model, this._tween).loop();
    }).chain(
      show(isPlayerTurn, this._model)
    );
  }

  /**
   * 非表示にする
   *
   * @return アニメーション
   */
  invisible(): Animate {
    return invisible(this._model).chain(process(() => {
      this._tween.removeAll();
    }));
  }

  /** ターンインジケーターで使うthree.jsオブジェクトを返す */
  getObject3D(): THREE.Object3D {
    return this._view.getObject3D();
  }

  /** 状態更新 */
  _update(action: Update): void {
    this._tween.update(action.time);
    this._view.engage(this._model);
  }

  /** プリレンダー */
  _preRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}
