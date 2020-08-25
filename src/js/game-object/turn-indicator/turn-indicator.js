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
import {turnChange} from "./animation/turn-change";
import {Animate} from "../../animation/animate";
import {createInitialValue} from "./model/initial-value";
import {waiting} from "./animation/waiting";
import {filter, first, map} from "rxjs/operators";

/** コンストラクタのパラメータ */
type Param = {
  resources: Resources,
  listener: Observable<GameObjectAction>
};

/** ターンインジケーター */
export class TurnIndicator {
  _tweenGroup: typeof TWEEN.Group;
  _model: TurnIndicatorModel;
  _view: TurnIndicatorView;
  _subscription: Subscription[];

  constructor(param: Param) {
    this._tweenGroup = new TWEEN.Group();
    this._model = createInitialValue();
    this._view = new TurnIndicatorView(param.resources);

    this._subscription = [
      param.listener.subscribe(action => {
        if (action.type === 'Update') {
          this._onUpdate(action);
        } else if (action.type === 'PreRender') {
          this._onPreRender(action);
        }
      }),

      param.listener.pipe(
        filter(v => v.type === 'Update'),
        map(v => ((v: any): Update)),
        first()
      ).subscribe((action: Update) => {
        this._onFirstUpdate(action);
      })
    ];
  }

  /** デストラクタ */
  destructor(): void {
    this._view.destructor();
    this._subscription.forEach(v => {
      v.unsubscribe();
    });
    this._tweenGroup.removeAll();
  }

  /**
   * ターン変更
   *
   * @param isPlayerTurn プレイヤーターンか否かのフラグ、trueでプレイヤーターン
   * @return アニメーション
   */
  turnChange(isPlayerTurn: boolean): Animate {
    return turnChange(isPlayerTurn, this._model);
  }

  /**
   * 非表示にする
   *
   * @return アニメーション
   */
  invisible(): Animate {
    return invisible(this._model);
  }

  /** ターンインジケーターで使うthree.jsオブジェクトを返す */
  getObject3D(): typeof THREE.Object3D {
    return this._view.getObject3D();
  }

  /**
   * 初回のアップデート時にのみ実行される処理
   *
   * @param action アクション
   */
  _onFirstUpdate(action: Update): void {
    waiting(this._model, this._tweenGroup).loop();
  }

  /**
   * アップデート時の処理
   *
   * @param action アクション
   */
  _onUpdate(action: Update): void {
    this._tweenGroup.update(action.time);
    this._view.engage(this._model);
  }

  /**
   * プリレンダー時の処理
   *
   * @param action アクション
   */
  _onPreRender(action: PreRender): void {
    this._view.lookAt(action.camera);
  }
}
